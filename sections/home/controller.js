"use strict";
var homeApp = app.components;
homeApp.controller('homePageCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    // $scope.pageTitle = "";
    // $scope.subTitle ="";
    // var pageData = {
    //     title: "",
    //     titleLine2: "n",
    //     subTitle: ""
    // };
    // $scope.$parent.$emit('refreshPageTitle', pageData);
	
	$scope.captchaKey = "6LfA6ykUAAAAAJlJ9MDpdGKL2HuKK9JvC5UUWzq5";
	
	$scope.alerts = [];
	$scope.contact = {
		name: '',
		email: '',
		message: '',
		captcha: null
	};
	
	
	$scope.setResponse = function (response) {
		$scope.contact.captcha = response;
	};
	$scope.setWidgetId = function (widgetId) {
		$scope.widgetId = widgetId;
	};
	$scope.cbExpiration = function() {
		vcRecaptchaService.reload($scope.widgetId);
		$scope.contact.captcha = null;
	};
	
	$http.get("sections/home/our-product.json").success(function(data) {
		$scope.ourProductList = data;
	});
	
	$http.get("sections/home/advantages.json").success(function(data) {
		$scope.ourAdvantagesList = data;
	});
	
	
	$scope.closeAlert = function (index) {
		$scope.alerts.splice(index, 1);
	};
	
	$scope.closeAllAlerts = function () {
		$timeout(function () {
			$scope.alerts = [];
		}, 10000);
	};
	
	$scope.sendContact = function(){
		$scope.alerts.push({ 'type': 'warning', 'msg': "Your message is being sent, please wait ..." });
		if($scope.contact.captcha){
			$http({
				method: 'POST',
				url: protocol + '//cloud-api.' + mydomain + '/projects/contact',
				data: $scope.contact,
				headers: { 'Content-Type': 'application/json', key: myKey }
			}).success(function (data, status, headers, config) {
				if (data.result === true) {
					$scope.contact = {
						name: '',
						email: '',
						message: '',
						captcha: null
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