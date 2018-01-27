"use strict";
var homeApp = app.components;
homeApp.controller('homePageCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

    var pageData = {
        title: "We give you digital agility",
        menuClass: "solution"
    };
    $scope.$parent.$emit('refreshPageTitle', pageData);
}]);