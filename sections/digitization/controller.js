"use strict";
var digitalApp = app.components;
digitalApp.controller('digitizationPageCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

  var pageData = {
    title: "WITH US -- NO BARRIER TO DIGITIZATION"
  };
  $scope.$parent.$emit('refreshPageTitle', pageData);
}]);
