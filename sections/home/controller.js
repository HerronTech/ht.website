"use strict";
var homeApp = app.components;
homeApp.controller('homePageCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.pageTitle = "Home";
    $scope.subTitle ="";
    var pageData = {
        title: "Home page",
        titleLine2: "n",
        subTitle: ""
    };
    $scope.$parent.$emit('refreshPageTitle', pageData);

}]);