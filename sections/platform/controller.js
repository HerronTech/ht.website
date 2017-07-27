"use strict";
var platformApp = app.components;
platformApp.controller('digitalPageCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

    var pageData = {
    title: "Our Platform"
    };
    $scope.$parent.$emit('refreshPageTitle', pageData);


}]);
