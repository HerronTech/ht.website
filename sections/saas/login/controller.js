"use strict";
var accountApp = app.components;

accountApp.controller('loginPageCtrl', ['$scope', '$http', 'ngDataApi', '$timeout', '$cookies', '$localStorage', 'isUserLoggedIn',
	function ($scope, $http, ngDataApi, $timeout, $cookies, $localStorage, isUserLoggedIn) {
		
		if (isUserLoggedIn($scope)) {
			$scope.$parent.go("/members/projects");
		}
		
		$scope.alerts = [];

		$scope.closeAlert = function (index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.closeAllAlerts = function () {
			$timeout(function () {
				$scope.alerts = [];
			}, 10000);
		};
		
		$scope.loginUserSubmit = function () {

		};

		var formConfig = loginConfig.formConf;
		formConfig.actions = [
			{
				'type': 'reset',
				'label': 'Register',
				'btn': 'warning',
				'action': function (formData) {
					$scope.$parent.go("/members/register");
				}
			},
			{
				'type': 'submit',
				'label': 'Login',
				'btn': 'primary',
				'action': function (formData) {

					$scope.alerts = [];
					var postData = {
						'username': formData.username,
						'password': formData.password,
						'grant_type': "password"
					};
					var authValue;

					function loginOauth() {
						var options1 = {
							"token": false,
							"method": "get",
							"routeName": "/oauth/authorization"
						};
						getSendDataFromServer($scope, ngDataApi, options1, function (error, response) {
							if (error) {
								overlayLoading.hide();
								$scope.alerts.push({
									'type': 'danger',
									'msg': error.message
								});
							}
							else {
								authValue = response.data;

								var options2 = {
									"method": "post",
									"routeName": "/oauth/token",
									"data": postData,
									"headers": {
										'accept': '*/*',
										"Authorization": authValue
									}
								};
								getSendDataFromServer($scope, ngDataApi, options2, function (error, response) {
									if (error) {
										overlayLoading.hide();
										$scope.alerts.push({
											'type': 'danger',
											'msg': error.message
										});
										$scope.closeAllAlerts();
									}
									else {
										if (Object.hasOwnProperty.call(response, "access_token")) {
											$cookies.put('access_token', response.access_token, { 'domain': interfaceDomain });
											$cookies.put('refresh_token', response.refresh_token, { 'domain': interfaceDomain });
										}
										uracLogin();
									}
								});

							}
						});
					}

					overlayLoading.show();
					loginOauth();
					var myUser;

					function uracLogin() {
						var options = {
							"method": "get",
							"routeName": "/urac/account/getUser",
							"params": {
								'username': formData.username
							}
						};
						getSendDataFromServer($scope, ngDataApi, options, function (error, response) {
							if (error) {
								overlayLoading.hide();
								ngDataApi.logoutUser($scope);
								$scope.alerts.push({
									'type': 'danger',
									'msg': error.message
								});
								$scope.closeAllAlerts();
							}
							else {
								myUser = response;
								//get dashboard keys
								getKeys();
							}
						});
					}

					function getKeys() {
						getSendDataFromServer($scope, ngDataApi, {
							"method": "get",
							"routeName": "/key/permission/get",
							"params": { "main": false }
						}, function (error, response) {
							if (error) {
								overlayLoading.hide();
								ngDataApi.logoutUser($scope);
								$scope.alerts.push({
									'type': 'danger',
									'msg': error.message
								});
								$scope.closeAllAlerts();
							}
							else {
								myUser.locked = response.locked || false;
								$localStorage.soajs_user = myUser;
								$cookies.put("soajs_username", myUser.username, { 'domain': interfaceDomain });
								$cookies.put("soajs_dashboard_key", response.extKey, { 'domain': interfaceDomain });
								getPermissions();
							}
						});
					}

					function getPermissions() {
						getSendDataFromServer($scope, ngDataApi, {
							"method": "get",
							"routeName": "/key/permission/get"
						}, function (error, response) {
							overlayLoading.hide();
							if (error) {
								$localStorage.soajs_user = null;
								ngDataApi.logoutUser($scope);
								$scope.alerts.push({
									'type': 'danger',
									'msg': error.message
								});
								$scope.closeAllAlerts();
							}
							else {
								$localStorage.acl_access = response.acl;
								$scope.$parent.go("/members/projects");
								$scope.$parent.$emit("loadUserInterface", {});
							}
						});
					}

				}
			}
		];

		buildForm($scope, null, formConfig);
		
	}]);

accountApp.controller('forgotPwPageCtrl', ['$scope', 'ngDataApi', 'isUserLoggedIn', '$timeout', function ($scope, ngDataApi, isUserLoggedIn, $timeout) {
	
	$scope.alerts = [];
	$scope.closeAlert = function (index) {
		$scope.alerts.splice(index, 1);
	};
	
	$scope.closeAllAlerts = function () {
		$timeout(function () {
			$scope.alerts = [];
		}, 10000);
	};
	
	var formConfig = forgetPwConfig.formConf;
	formConfig.actions = [
		{
			'type': 'submit',
			'label': 'Submit',
			'btn': 'primary',
			'action': function (formData) {

				$scope.alerts = [];
				var postData = {
					'username': formData.username
				};
				overlayLoading.show();

				var options1 = {
					"method": "get",
					"routeName": "/urac/forgotPassword",
					"params": postData
				};
				getSendDataFromServer($scope, ngDataApi, options1, function (error, response) {
					overlayLoading.hide();
					if (error) {
						$scope.alerts.push({
							'type': 'danger',
							'msg': error.message
						});
					}
					else {
						$scope.alerts.push({
							'type': 'success',
							'msg': "A reset link has been sent to your email address."
						});
					}
					$scope.closeAllAlerts();
				});
			}
		}
	];

	buildForm($scope, null, formConfig);
	
}]);

accountApp.controller('resetPwCtrl', ['$scope', 'ngDataApi', '$routeParams', 'isUserLoggedIn', '$route',
	function ($scope, ngDataApi, $routeParams, isUserLoggedIn, $route) {
		$scope.alerts = [];
		$scope.closeAlert = function (index) {
			$scope.alerts.splice(index, 1);
		};

		$scope.closeAllAlerts = function () {
			$timeout(function () {
				$scope.alerts = [];
			}, 30000);
		};

		var formConfig = resetPwConfig.formConf;
		formConfig.actions = [{
			'type': 'submit',
			'label': 'Submit',
			'btn': 'primary',
			'action': function (formData) {
				var postData = {
					'password': formData.password,
					'confirmation': formData.confirmPassword
				};
				if (formData.password != formData.confirmPassword) {
					$scope.alerts.push({
						'type': 'danger',
						'msg': "Password And Confirm Fields Do Not Match!"
					});
					$scope.closeAllAlerts();
					return;
				}
				getSendDataFromServer($scope, ngDataApi, {
					"method": "send",
					"routeName": "/urac/resetPassword",
					"params": { "token": $routeParams.token },
					"data": postData
				}, function (error) {
					if (error) {
						$scope.alerts.push({
							'type': 'danger',
							'msg': error.message
						});
						$scope.closeAllAlerts();
					}
					else {
						$scope.alerts.push({
							'type': 'success',
							'msg': "Your password was reset."
						});
						$scope.closeAllAlerts();
					}
				});
			}
		}];
		
		buildForm($scope, null, formConfig);

	}]);

accountApp.controller('validateCtrl', ['$scope', 'ngDataApi', '$route', 'isUserLoggedIn', '$timeout',
	function ($scope, ngDataApi, $route, isUserLoggedIn, $timeout) {
		$scope.alerts = [];
		$scope.closeAlert = function (index) {
			$scope.alerts.splice(index, 1);
		};

		$scope.closeAllAlerts = function () {
			$timeout(function () {
				$scope.alerts = [];
			}, 30000);
		};

		$scope.validateChangeEmail = function () {
			getSendDataFromServer($scope, ngDataApi, {
				"method": "get",
				"routeName": "/urac/changeEmail/validate",
				"params": {
					"token": $route.current.params.token
				}
			}, function (error) {
				if (error) {
					$scope.alerts.push({
						'type': 'danger',
						'msg': error.message
					});
					$scope.closeAllAlerts();
				}
				else {
					$scope.alerts.push({
						'type': 'success',
						'msg': "Your Email was Changed Successfully"
					});
					$scope.closeAllAlerts();
					setTimeout(function () {
						$scope.$parent.go("/members/profile");
					}, 3000);
				}
			});
		};

		$scope.validateChangeEmail();
	}]);
