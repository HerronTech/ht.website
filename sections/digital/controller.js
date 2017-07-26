"use strict";
var digitalApp = app.components;
digitalApp.controller('digitalPageCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

  var pageData = {
    title: "We give you digital agility",
    menuClass: "solution"
  };
  $scope.$parent.$emit('refreshPageTitle', pageData);


}]);
