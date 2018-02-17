"use strict";

app.service('ngDataApi', ['$http', '$cookies', '$localStorage', function ($http, $cookies, $localStorage) {
	
	function logoutUser(scope) {
		$cookies.remove('soajs_project', {'domain': interfaceDomain});
		$cookies.remove('soajs_username', {'domain': interfaceDomain});
		$cookies.remove('access_token', { 'domain': interfaceDomain });
		$cookies.remove('refresh_token', { 'domain': interfaceDomain });
		$cookies.remove('ht_dashboard_key', { 'domain': interfaceDomain });
		$cookies.remove('myEnv', { 'domain': interfaceDomain });
		$cookies.remove('soajs_auth', { 'domain': interfaceDomain });
		$cookies.remove('soajs_current_route', { 'domain': interfaceDomain });
		$localStorage.soajs_user = null;
		$localStorage.acl_access = null;
		$localStorage.environments = null;
		scope.$parent.enableInterface = false;
	}
	
	function revalidateTokens(scope, config, cb) {
		//create a copy of old config
		var myDomain = config.url.replace(/http(s)?:\/\//, '');
		myDomain = myDomain.split("/")[0];
		myDomain = protocol + "//" + myDomain;
		
		//first authorize
		var reAuthorizeConfig = angular.copy(config);
		reAuthorizeConfig.method = 'GET';
		reAuthorizeConfig.url = myDomain + "/oauth/authorization";
		reAuthorizeConfig.headers.key = apiConfiguration.key;
		reAuthorizeConfig.headers.accept = "*/*";
		delete reAuthorizeConfig.headers.Authorization;
		delete reAuthorizeConfig.params;
		
		$http(reAuthorizeConfig).success(function (response) {
			
			//second get new tokens.
			var authValue = response.data;
			var getNewAccessToken = angular.copy(config);
			getNewAccessToken.method = 'POST';
			getNewAccessToken.url = myDomain + "/oauth/token";
			getNewAccessToken.headers.Authorization = authValue;
			delete getNewAccessToken.params;
			getNewAccessToken.data = {
				'refresh_token': $cookies.get('refresh_token', { 'domain': interfaceDomain }),
				'grant_type': "refresh_token"
			};
			
			$http(getNewAccessToken).success(function (response) {
				$cookies.put('access_token', response.access_token, { 'domain': interfaceDomain });
				$cookies.put('refresh_token', response.refresh_token, { 'domain': interfaceDomain });
				
				//repeat the main call
				var MainAPIConfig = angular.copy(config);
				MainAPIConfig.params.access_token = $cookies.get('access_token', { 'domain': interfaceDomain });
				$http(MainAPIConfig).success(function (response, status, headers, config) {
					returnAPIResponse(scope, response, config, cb)
				}).error(function (errData, status, headers, config) {
					//logout the user
					logoutUser(scope);
					returnErrorOutput(config, status, headers, config, cb)
				});
			}).error(function (errData, status, headers, config) {
				//logout the user
				logoutUser(scope);
				returnErrorOutput(config, status, headers, config, cb)
			});
		}).error(function (errData, status, headers, config) {
			//logout the user
			logoutUser(scope);
			returnErrorOutput(config, status, headers, config, cb)
		});
	}
	
	function returnErrorOutput(opts, status, headers, config, cb) {
		console.log(status, headers, config);
		return cb(new Error("Unable Fetching data from " + config.url));
	}
	
	function returnAPIError(scope, opts, status, headers, errData, config, cb) {
		//try to get a new access token from the refresh
		if (errData && errData.errors.details[0].code === 401 && ["The access token provided is invalid.", "The access token provided has expired."].indexOf(errData.errors.details[0].message) !== -1) {
			revalidateTokens(scope, config, cb);
		}
		else {
			if (errData && errData.errors) {
				return cb(new Error(errData.errors.details[0].code + ": " + errData.errors.details[0].message));
			}
			else {
				returnErrorOutput(opts, status, headers, config, cb)
			}
		}
	}
	
	function returnAPIResponse(scope, response, config, cb) {
		if (config.responseType === 'arraybuffer' && response) {
			try {
				var res = String.fromCharCode.apply(null, new Uint8Array(response));
				if (typeof res !== 'object') {
					res = JSON.parse(res);
				}
				if (res.result === false) {
					var str = '';
					for (var i = 0; i < res.errors.details.length; i++) {
						str += "Error[" + res.errors.details[i].code + "]: " + res.errors.details[i].message;
					}
					var errorObj = {
						message: str,
						codes: res.errors.codes,
						details: res.errors.details
					};
					if (res.errors.codes && res.errors.codes[0]) {
						errorObj.code = res.errors.codes[0];
					}
					return cb(errorObj);
				}
				else {
					return cb(null, response);
				}
			}
			catch (e) {
				console.log("Unable to parse arraybuffer response. Possible reason: response is a stream and too large.");
				return cb(null, response);
			}
		}
		else if (response && !Object.hasOwnProperty.call(response, "result")) {
			return cb(null, response);
		}
		else if (response && response.result === true) {
			if (response.soajsauth && $cookies.get('soajs_auth', { 'domain': interfaceDomain })) {
				$cookies.put("soajs_auth", response.soajsauth, { 'domain': interfaceDomain });
			}
			var resp = {};
			for (var i in response) {
				resp[i] = response[i];
			}
			if (resp.data) {
				if (typeof(resp.data) !== 'object') {
					if (typeof(resp.data) === 'string') {
						resp.data = {
							data: resp.data
						};
					}
					else {
						resp.data = {};
					}
				}
			}
			else {
				resp.data = {};
			}
			resp.data.soajsauth = resp.soajsauth;
			return cb(null, resp.data);
		}
		else {
			//try to refresh the access token before logging out the user
			if (response.errors.details[0].code === 401 && ["The access token provided is invalid.", "The access token provided has expired."].indexOf(response.errors.details[0].message) !== -1) {
				revalidateTokens(scope, config, cb);
			}
			else {
				var str = '';
				for (var i = 0; i < response.errors.details.length; i++) {
					str += "Error[" + response.errors.details[i].code + "]: " + response.errors.details[i].message;
				}
				var errorObj = {
					message: str,
					codes: response.errors.codes,
					details: response.errors.details
				};
				if (response.errors.codes && response.errors.codes[0]) {
					errorObj.code = response.errors.codes[0];
				}
				return cb(errorObj);
			}
		}
	}
	
	function executeRequest(scope, opts, cb) {
		var config = {
			token: opts.token,
			url: opts.url,
			method: opts.method,
			params: opts.params || {},
			xsrfCookieName: opts.cookie || "",
			cache: opts.cache || false,
			timeout: opts.timeout || 60000,
			responseType: opts.responseType || 'json',
			headers: opts.headers || {},
			data: opts.data || {},
			json: true
		};
		
		var soajsAuthCookie = $cookies.get('soajs_auth', { 'domain': interfaceDomain });
		if (soajsAuthCookie && soajsAuthCookie.indexOf("Basic ") !== -1) {
			config.headers.soajsauth = soajsAuthCookie.replace(/\"/g, '');
		}
		
		if (opts.headers.key) {
			config.headers.key = opts.headers.key;
		}
		else if ($cookies.get("ht_dashboard_key", { 'domain': interfaceDomain })) {
			config.headers.key = $cookies.get("ht_dashboard_key", { 'domain': interfaceDomain }).replace(/\"/g, '');
		}
		else {
			config.headers.key = apiConfiguration.key;
		}
		
		var access_token = $cookies.get('access_token', { 'domain': interfaceDomain });
		if (access_token && config.token) {
			config.params.access_token = access_token;
		}

		if (opts.jsonp === true) {
			config.url += (config.url.indexOf('?') === -1) ? '?' : '&';
			config.url += "callback=JSON_CALLBACK";
			config.method = (config.method.toLowerCase() === 'get') ? 'jsonp' : config.method;
		}
		
		$http(config).success(function (response, status, headers, config) {
			returnAPIResponse(scope, response, config, cb);
		}).error(function (errData, status, headers, config) {
			returnAPIError(scope, opts, status, headers, errData, config, cb);
		});
	}
	
	function getData(scope, opts, cb) {
		opts.method = 'GET';
		opts.api = 'getData';
		executeRequest(scope, opts, cb);
	}
	
	function sendData(scope, opts, cb) {
		opts.method = 'POST';
		opts.api = 'sendData';
		executeRequest(scope, opts, cb);
	}
	
	function putData(scope, opts, cb) {
		opts.method = 'PUT';
		opts.api = 'putData';
		executeRequest(scope, opts, cb);
	}
	
	function delData(scope, opts, cb) {
		opts.method = 'DELETE';
		opts.api = 'delData';
		executeRequest(scope, opts, cb);
	}
	
	return {
		'get': getData,
		'send': sendData,
		'post': sendData,
		'put': putData,
		'del': delData,
		'delete': delData,
		'logoutUser': logoutUser
	};
}]);

app.service('isUserLoggedIn', ['$cookies', '$localStorage', 'ngDataApi', function ($cookies, $localStorage, ngDataApi) {
	return function (currentScope) {
		if ($localStorage.soajs_user && $cookies.get('access_token', {'domain': interfaceDomain})) {
			return true;
		}
		else {
			ngDataApi.logoutUser(currentScope);
			return false;
		}
	}
}]);

app.service("injectFiles", function () {
	
	function injectCss(filePath) {
		var csstag = "<link rel='stylesheet' type='text/css' href='" + filePath + "' />";
		jQuery("head").append(csstag);
	}
	
	return {
		'injectCss': injectCss
	}
});