"use strict";
var accountApp = app.components;
accountApp.controller('registerPageCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

	$scope.alerts = [];
	$scope.contact = {
		name: '',
		email: '',
		phone: '',
		address: '',
		company: '',
		sector: '',
		position: '',
		aboutUs: '',
		lookingFor: '',
		captcha: ''
	};
	
	$scope.closeAlert = function (index) {
		$scope.alerts.splice(index, 1);
	};
	
	$scope.closeAllAlerts = function () {
		$timeout(function () {
			$scope.alerts = [];
		}, 10000);
	};
	
	$scope.sendContact = function () {
		$scope.alerts.push({ 'type': 'warning', 'msg': "Your message is being sent, please wait ..." });
		$scope.contact.captcha = iCaptcha1Value;
		if ($scope.contact.captcha) {
			$http({
				method: 'POST',
				url: '/sections/account/register/sendMail.php',
				data: $scope.contact,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success(function (data, status, headers, config) {
				grecaptcha.reset();
				if (data.result === true) {
					$scope.contact = {
						name: '',
						email: '',
						phone: '',
						address: '',
						company: '',
						sector: '',
						position: '',
						aboutUs: '',
						lookingFor: ''
					};
					
					$scope.alerts.push({
						'type': 'success',
						'msg': "Thank you for contacting us. We will get back to you shortly."
					});
					$scope.closeAllAlerts();
				}
				else {
					$scope.alerts.push({
						'type': 'danger',
						'msg': "Sorry, wasn't able to send your message to the team. Try again later."
					});
					$scope.closeAllAlerts();
				}
			}).error(function (errData, status, headers, config) {
				$scope.alerts.push({
					'type': 'danger',
					'msg': "Sorry, wasn't able to send your message to the team. Try again later."
				});
				$scope.closeAllAlerts();
			});
		}
	}
	
}]);
