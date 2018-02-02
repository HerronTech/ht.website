"use strict";

var accountApp = app.components;

accountApp.controller('changeSecurityCtrl', ['$scope', '$timeout', '$modal', 'ngDataApi', function ($scope, $timeout, $modal, ngDataApi) {
	
	$scope.$parent.$on('xferData', function (event, args) {
		$scope.memberData = args.memberData;
	});
	
	$scope.alerts = [];
	$scope.closeAlert = function (index) {
		$scope.alerts.splice(index, 1);
	};
	
	$scope.closeAllAlerts = function () {
		$timeout(function () {
			$scope.alerts = [];
		}, 30000);
	};
	
	$scope.changeEmail = function () {
		var config = changeEmailConfig.formConf;
		var options = {
			form: config,
			'timeout': $timeout,
			'name': 'changeEmail',
			'label': translation.changeEmail[LANG],
			'actions': [
				{
					'type': 'submit',
					'label': translation.changeEmail[LANG],
					'btn': 'primary',
					'action': function (formData) {
						var postData = {
							'email': formData.email
						};
						overlayLoading.show();
						getSendDataFromServer($scope, ngDataApi, {
							"method": "send",
							"headers": {
								"key": apiConfiguration.key
							},
							"routeName": "/urac/account/changeEmail",
							"params": { "uId": $scope.memberData._id },
							"data": postData
						}, function (error) {
							overlayLoading.hide();
							if (error) {
								$scope.form.displayAlert('danger', error.message);
							}
							else {
								$scope.alerts.push({
									'type': 'success',
									'msg': "A link will be sent to your new email address to validate the change."
								});
								$scope.modalInstance.close();
								$scope.form.formData = {};
							}
						});
					}
				},
				{
					'type': 'reset',
					'label': translation.cancel[LANG],
					'btn': 'danger',
					'action': function () {
						$scope.modalInstance.dismiss('cancel');
						$scope.form.formData = {};
					}
				}
			]
		};
		buildFormWithModal($scope, $modal, options);
	};
	
	$scope.changePassword = function () {
		var config = changePwConfig.formConf;
		var options = {
			form: config,
			'timeout': $timeout,
			'name': 'changePassword',
			'label': translation.changePassword[LANG],
			'actions': [
				{
					'type': 'submit',
					'label': translation.changePassword[LANG],
					'btn': 'primary',
					'action': function (formData) {
						var postData = {
							'password': formData.password,
							'oldPassword': formData.oldPassword,
							'confirmation': formData.confirmPassword
						};
						if (formData.password != formData.confirmPassword) {
							$scope.form.displayAlert('danger', translation.errorMessageChangePassword[LANG]);
							return;
						}
						overlayLoading.show();
						getSendDataFromServer($scope, ngDataApi, {
							"method": "send",
							"headers": {
								"key": apiConfiguration.key
							},
							"routeName": "/urac/account/changePassword",
							"params": { "uId": $scope.memberData._id },
							"data": postData
						}, function (error) {
							overlayLoading.hide();
							if (error) {
								$scope.form.displayAlert('danger', error.message);
							}
							else {
								$scope.modalInstance.close();
								$scope.form.formData = {};
							}
						});
					}
				},
				{
					'type': 'reset',
					'label': translation.cancel[LANG],
					'btn': 'danger',
					'action': function () {
						$scope.modalInstance.dismiss('cancel');
						$scope.form.formData = {};
					}
				}
			]
		};
		buildFormWithModal($scope, $modal, options);
	};
}]);

accountApp.controller('myAccountCtrl', ['$scope', '$timeout', '$modal', 'ngDataApi', '$cookies', '$localStorage', 'isUserLoggedIn',
	function ($scope, $timeout, $modal, ngDataApi, $cookies, $localStorage, isUserLoggedIn) {
		if (!isUserLoggedIn($scope)) {
			$scope.$parent.go("/members/login");
		}
		
		var userCookie = $localStorage.soajs_user;
		
		var formConfig = {
			form: profileConfig.formConf,
			'timeout': $timeout,
			'name': 'editProfile',
			'label': 'Edit Profile',
			'entries': [
				{
					'name': 'firstName',
					'label': 'First Name',
					'type': 'text',
					'placeholder': translation.enterFirstName[LANG],
					'value': '',
					'tooltip': translation.enterFirstNameUser[LANG],
					'required': true
				},
				{
					'name': 'lastName',
					'label': translation.lastName[LANG],
					'type': 'text',
					'placeholder': translation.enterLastName[LANG],
					'value': '',
					'tooltip': translation.enterLastNameUser[LANG],
					'required': true
				},
				{
					'name': 'email',
					'label': translation.email[LANG],
					'type': 'readonly',
					'placeholder': translation.enterEmail[LANG],
					'value': '',
					'tooltip': translation.emailToolTip[LANG],
					'required': true
				},
				{
					'name': 'username',
					'label': translation.username[LANG],
					'type': 'text',
					'placeholder': translation.enterUsername[LANG],
					'value': '',
					'tooltip': translation.usernamesToolTip[LANG],
					'required': true
				}
				// {
				// 	'name': 'profile',
				// 	'label': translation.profile[LANG],
				// 	'type': 'jsoneditor',
				// 	'options': {
				// 		'mode': 'code',
				// 		'availableModes': [{ 'v': 'code', 'l': 'Code View' }, {
				// 			'v': 'tree',
				// 			'l': 'Tree View'
				// 		}, { 'v': 'form', 'l': 'Form View' }]
				// 	},
				// 	'height': '300px',
				// 	"value": {},
				// 	'required': false,
				// 	'tooltip': translation.fillYourAdditionalProfileInformation[LANG]
				// }
			],
			'data': {},
			'actions': [
				{
					'type': 'submit',
					'label': 'Edit Profile',
					'btn': 'primary',
					'action': function (formData) {
						var profileObj = (formData.profile) ? formData.profile : {};
						
						var postData = {
							'username': formData.username,
							'firstName': formData.firstName,
							'lastName': formData.lastName,
							'profile': profileObj
						};
						getSendDataFromServer($scope, ngDataApi, {
							"method": "send",
							"routeName": "/urac/account/editProfile",
							"headers": {
								"key": apiConfiguration.key
							},
							"params": { "uId": $scope.uId },
							"data": postData
						}, function (error) {
							if (error) {
								$scope.form.displayAlert('danger', error.message);
							}
							else {
								$scope.form.displayAlert('success', 'Profile Updated Successfully');
								
								userCookie.firstName = formData.firstName;
								userCookie.username = formData.username;
								userCookie.lastName = formData.lastName;
								userCookie.profile = profileObj;
								
								$localStorage.soajs_user = userCookie;
								$scope.$parent.$emit('refreshWelcome', {});
							}
						});
					}
				}
			]
		};
		
		$scope.getProfile = function (username) {
			getSendDataFromServer($scope, ngDataApi, {
				"method": "get",
				"headers": {
					"key": apiConfiguration.key
				},
				"routeName": "/urac/account/getUser",
				"params": { "username": username }
			}, function (error, response) {
				if (error) {
					$scope.$parent.displayAlert("danger", error.code, true, 'urac', error.message);
				}
				else {
					$scope.uId = response._id;
					var p = response.profile;
					formConfig.data = response;
					formConfig.data.profile = p;
					buildForm($scope, null, formConfig);
					
					$scope.$parent.$emit('xferData', { 'memberData': response });
				}
			});
		};
		
		if ((typeof(userCookie) !== "undefined") && (typeof(userCookie) === "object")) {
			var uname = userCookie.username;
			$scope.getProfile(uname);
		}
		else {
			$scope.$parent.go("/members/login");
		}
		
	}]);