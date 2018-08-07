"use strict";
var accountApp = app.components;

accountApp.controller('registerPageCtrl', ['$scope', '$http', '$timeout', 'injectFiles', 'ngDataApi',
	function ($scope, $http, $timeout, injectFiles, ngDataApi) {
		injectFiles.injectCss("sections/saas/projects.css");
		
		$scope.openForm = true;
		$scope.confirm = {};

		var pageData = {
			title: "JOIN US - TO GET INVITED"
		};
		$scope.$parent.$emit('refreshPageTitle', pageData);
		
		$scope.captchaKey = "6LfA6ykUAAAAAJlJ9MDpdGKL2HuKK9JvC5UUWzq5";
		
		$scope.alerts = [];
		$scope.contact = {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			address: '',
			company: '',
			companySize: '',
			sector: '',
			position: '',
			aboutUs: '',
			lookingFor: '',
			usingSoajs: '',
			captcha: null
		};
		
		$scope.closeAlert = function (index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.closeAllAlerts = function () {
			$timeout(function () {
				$scope.alerts = [];
			}, 10000);
		};
		
		$scope.setResponse = function (response) {
			$scope.contact.captcha = response;
		};
		$scope.setWidgetId = function (widgetId) {
			$scope.widgetId = widgetId;
		};
		$scope.cbExpiration = function () {
			vcRecaptchaService.reload($scope.widgetId);
			$scope.contact.captcha = null;
		};
		
		$scope.sendContact = function () {
			$scope.confirm = angular.copy($scope.contact);
			$scope.alerts.push({
				'type': 'warning',
				'msg': "Your message is being sent, please wait ..."
			});
			if ($scope.contact.captcha) {
				let options = {
					"method": "send",
					"routeName": "/projects/register",
					"data": {
						data: $scope.contact
					}
				};
				getSendDataFromServer($scope, ngDataApi, options, function (error, response) {
					if (error) {
						let msg = "Sorry, wasn't able to send your message to the team. Try again later.";
						if (error.code === 406) {
							msg = "You have already registered with this email";
						}
						$scope.alerts.push({
							'type': 'danger',
							'msg': msg
						});
						$scope.closeAllAlerts();
					}
					else {
						$scope.contact = {
							firstName: '',
							lastName: '',
							email: '',
							phone: '',
							address: '',
							company: '',
							companySize: '',
							sector: '',
							position: '',
							aboutUs: '',
							usingSoajs: '',
							lookingFor: '',
							captcha: null
						};

						$scope.openForm = false;
						$scope.closeAllAlerts();
					}
				});
				
			}
		}
		
	}]);
