"use strict";
var disruptionApp = app.components;
disruptionApp.controller('executivePageCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

    var pageData = {
    title: "Executive Summary"
    };
    $scope.$parent.$emit('refreshPageTitle', pageData);


}]);
