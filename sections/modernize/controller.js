"use strict";
var disruptionApp = app.components;
disruptionApp.controller('modernizePageCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

    var pageData = {
    title: "Modernize Your IT Ecosystem"
    };
    $scope.$parent.$emit('refreshPageTitle', pageData);


}]);
