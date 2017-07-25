"use strict";
var digitalApp = app.components;
digitalApp.controller('digitalPageCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

    var pageData = {
    title: "Why digital agility"
    };
    $scope.$parent.$emit('refreshPageTitle', pageData);


}]);
