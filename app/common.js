"use strict";

function buildPermittedOperationEnv(localStorage, serviceName, routePath, method, env, cb) {
	
	function checkApiHasAccess(aclObject, serviceName, routePath, method, userGroups, callback) {
		var environments = Object.keys(aclObject);
		return validateAccess(environments, 0, callback);
		
		function validateAccess(environments, i, cb) {
			var envCode = environments[i].toLowerCase();
			
			if (!aclObject[envCode] || !aclObject[envCode][serviceName]) {
				i++;
				if (i === environments.length) {
					return cb(false);
				}
				else {
					validateAccess(environments, i, cb);
				}
			}
			else {
				var system = aclObject[envCode][serviceName];
				if (system) {
					var access = checkSystem(system);
					return cb(access);
				}
				else {
					return cb(false);
				}
			}
		}
		
		function checkSystem(system) {
			function getAclObj(aclObj) {
				if (aclObj && (aclObj.apis || aclObj.apisRegExp)) {
					return aclObj;
				}
				if (method) {
					if (aclObj[method] && typeof aclObj[method] === "object") {
						var newAclObj = {};
						if (aclObj.hasOwnProperty('access')) {
							newAclObj.access = aclObj.access;
						}
						if (aclObj[method].hasOwnProperty('apis')) {
							newAclObj.apis = aclObj[method].apis;
						}
						if (aclObj[method].hasOwnProperty('apisRegExp')) {
							newAclObj.apisRegExp = aclObj[method].apisRegExp;
						}
						if (aclObj[method].hasOwnProperty('apisPermission')) {
							newAclObj.apisPermission = aclObj[method].apisPermission;
						}
						else if (aclObj.hasOwnProperty('apisPermission')) {
							newAclObj.apisPermission = aclObj.apisPermission;
						}
						return newAclObj;
					}
					else {
						return aclObj;
					}
				}
				else {
					return aclObj;
				}
			}
			
			system = getAclObj(system);
			
			var api = (system && system.apis ? system.apis[routePath] : null);
			
			if (!api && system && system.apisRegExp && Object.keys(system.apisRegExp).length) {
				for (var jj = 0; jj < system.apisRegExp.length; jj++) {
					if (system.apisRegExp[jj].regExp && routePath.match(system.apisRegExp[jj].regExp)) {
						api = system.apisRegExp[jj];
						break;
					}
				}
			}
			if (Object.hasOwnProperty.call(system, 'access')) {
				if (Array.isArray(system.access)) {
					var checkAPI = false;
					if (userGroups) {
						for (var ii = 0; ii < userGroups.length; ii++) {
							if (system.access.indexOf(userGroups[ii]) !== -1) {
								checkAPI = true;
								break;
							}
						}
					}
					if (!checkAPI) {
						return false;
					}
				}
				return api_checkPermission(system, userGroups, api);
			}
			
			if (api || (system && system.apisPermission === 'restricted')) {
				return api_checkPermission(system, userGroups, api);
			}
			else {
				return true;
			}
		}
		
		function api_checkPermission(system, userGroups, api) {
			if ('restricted' === system.apisPermission) {
				if (!api) {
					return false;
				}
				return api_checkAccess(api.access, userGroups);
			}
			if (!api) {
				return true;
			}
			
			return api_checkAccess(api.access, userGroups);
		}
		
		function api_checkAccess(apiAccess, userGroups) {
			if (!apiAccess) {
				return true;
			}
			
			if (apiAccess instanceof Array) {
				if (!userGroups) {
					return false;
				}
				
				var found = false;
				for (var ii = 0; ii < userGroups.length; ii++) {
					if (apiAccess.indexOf(userGroups[ii]) !== -1) {
						found = true;
						break;
					}
				}
				return found;
			}
			else {
				return true;
			}
		}
	}
	
	var user = localStorage.soajs_user;
	if (user) {
		var userGroups = user.groups;
		var acl = {};
		if (localStorage.acl_access) {
			acl[env.toLowerCase()] = localStorage.acl_access[env.toLowerCase()];
			
			checkApiHasAccess(acl, serviceName, routePath, method, userGroups, function (access) {
				return cb(access);
			});
		} else {
			return cb(false);
		}
	}
	else {
		return cb(false);
	}
}

/**
 * build the access permissions of a module from permissionsObj
 */
function constructModulePermissions(scope, localStorage, access, permissionsObj, forceEnv) {
	for (var permission in permissionsObj) {
		if (Array.isArray(permissionsObj[permission])) {
			var env = 'dashboard';
			if (forceEnv) {
				env = forceEnv;
			}
			
			env = env.toLowerCase();
			buildPermittedOperationEnv(localStorage, permissionsObj[permission][0], permissionsObj[permission][1], permissionsObj[permission][2], env, function (hasAccess) {
				access[permission] = hasAccess;
				if (!scope.$$phase) {
					scope.$apply();
				}
			});
		}
		else if (typeof(permissionsObj[permission]) === 'object') {
			access[permission] = {};
			constructModulePermissions(scope, localStorage, access[permission], permissionsObj[permission], forceEnv);
		}
	}
}

/*
 common function calls ngDataAPI angular service to connect and send/get data to api
 */
function getSendDataFromServer($scope, ngDataApi, options, callback) {
	var apiOptions = {
		url: (options.url) ? options.url + options.routeName : apiConfiguration.domain + options.routeName,
		headers: {
			'Content-Type': 'application/json'
		}
	};
	
	if (Object.hasOwnProperty.call(options, 'token')) {
		apiOptions.token = options.token;
	}
	else {
		apiOptions.token = true;
	}
	
	if (options.jsonp) {
		apiOptions.jsonp = true;
	}
	
	if (options.params) {
		apiOptions.params = options.params;
	}
	
	if (options.data) {
		apiOptions.data = options.data;
	}
	
	if (options.method) {
		apiOptions.method = options.method;
	}
	
	if (options.responseType) {
		apiOptions.responseType = options.responseType;
	}
	
	if (options.upload) {
		apiOptions.upload = options.upload;
		if (options.file) {
			apiOptions.file = options.file;
		}
	}
	
	if (options.headers) {
		for (var i in options.headers) {
			if (options.headers.hasOwnProperty(i)) {
				if (options.headers[i] === null) {
					delete apiOptions.headers[i];
				}
				else {
					apiOptions.headers[i] = options.headers[i];
				}
			}
		}
	}
	
	ngDataApi[options.method]($scope, apiOptions, callback);
}

/*
 common function mostyly used by grids. loops over all selected records and calls getSendDataFromServer to send/get data to api
 */
function multiRecordUpdate(ngDataApi, $scope, opts, callback) {
	var err = 0, valid = [];
	var referenceKeys = [];
	var options = angular.copy(opts);
	var fieldName = (opts.override && opts.override.fieldName) ? options.override.fieldName : "_id";
	var token = (opts.override && opts.override.fieldName) ? "%" + options.override.fieldName + "%" : "%id%";
	var baseRoute = options.routeName;
	var method = options.method || 'get';
	var grid = $scope.grid;
	if (opts.grid) {
		grid = opts.grid;
	}
	for (var i = grid.rows.length - 1; i >= 0; i--) {
		if (grid.rows[i].selected) {
			referenceKeys.push(grid.rows[i][fieldName]);
		}
	}
	
	performUpdate(referenceKeys, 0, function () {
		if ($scope.alerts) {
			if (err > 0) {
				$scope.alerts.push({
					'type': 'danger',
					'msg': opts.msg.error
				});
			}
			if (err < referenceKeys.length) {
				$scope.alerts.push({
					'type': 'success',
					'msg': opts.msg.success
				});
			}
			$scope.closeAllAlerts();
		}
		if (callback) {
			callback(valid);
		}
	});
	
	function performUpdate(referenceKeys, counter, cb) {
		var oneRoute = angular.copy(baseRoute);
		var oneValue = referenceKeys[counter];
		if (opts.routeParam) {
			oneRoute = oneRoute.replace(token, oneValue);
		}
		else {
			if (opts.params) {
				for (var i in opts.params) {
					if (opts.params[i] === token) {
						options.params[i] = referenceKeys[counter];
						if (opts.override && opts.override.fieldReshape) {
							options.params[i] = opts.override.fieldReshape(opts.params[i]);
						}
					}
				}
			}
			
			if (opts.data) {
				for (var i in opts.data) {
					if (opts.data[i] === token) {
						options.data[i] = referenceKeys[counter];
						if (opts.override && opts.override.fieldReshape) {
							options.data[i] = opts.override.fieldReshape(opts.data[i]);
						}
					}
				}
			}
		}
		
		var sendOptions = {
			"method": method,
			"headers": options.headers,
			"routeName": oneRoute,
			"params": options.params,
			"data": options.data,
			"url": options.url
		};
		
		if (opts.proxy) {
			sendOptions.proxy = opts.proxy;
		}
		
		getSendDataFromServer($scope, ngDataApi, sendOptions, function (error, response) {
			if (error || !response) {
				err++;
			}
			else {
				valid.push(referenceKeys[counter]);
			}
			
			counter++;
			if (counter < referenceKeys.length) {
				performUpdate(referenceKeys, counter, cb);
			}
			else {
				return cb();
			}
		});
	}
}

function fixBackDrop() {
	var overlayHeight = jQuery(document).height();
	setTimeout(function () {
		jQuery(".modal-backdrop").css('height', overlayHeight + 'px');
	}, 20);
}

function objectIsEnv(obj) {
	if (obj) {
		if (JSON.stringify(obj) === '{}') {
			return false;
		}
		if (!Object.hasOwnProperty.call(obj, 'access') && !obj.apis && !obj.apisRegExp && !obj.apisPermission) {
			if (obj.get || obj.post || obj.put || obj.delete) {
				return false;
			}
			return true;
		}
	}
	return false;
}