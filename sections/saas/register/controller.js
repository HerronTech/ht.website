"use strict";
var accountApp = app.components;

accountApp.controller('registerPageCtrl', ['$scope', '$http', '$timeout', 'injectFiles', 'ngDataApi',
	function ($scope, $http, $timeout, injectFiles, ngDataApi) {
		injectFiles.injectCss("sections/saas/projects.css");

		var pageData = {
			title: "JOIN US - TO GET INVITED"
		};
		$scope.$parent.$emit('refreshPageTitle', pageData);

		$scope.captchaKey = "6LfA6ykUAAAAAJlJ9MDpdGKL2HuKK9JvC5UUWzq5";

		$scope.alerts = [];
		$scope.contact = {
			name: '',
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
			$scope.alerts.push({ 'type': 'warning', 'msg': "Your message is being sent, please wait ..." });
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

						$scope.alerts.push({
							'type': 'danger',
							'msg': "Sorry, wasn't able to send your message to the team. Try again later."
						});
						$scope.closeAllAlerts();

					}
					else {
						$scope.contact = {
							name: '',
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

						$scope.alerts.push({
							'type': 'success',
							'msg': "Thank you for contacting us. We will get back to you shortly."
						});
						$scope.closeAllAlerts();
					}
				});

			}
		}

	}]);
