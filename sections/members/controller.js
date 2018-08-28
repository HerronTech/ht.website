"use strict";
var memberApp = app.components;
memberApp.controller('memberPageCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
	
	var pageData = {
		title: "Member Area"
	};
	$scope.$parent.$emit('refreshPageTitle', pageData);
	
	
}]);
