"use strict";
var accountApp = app.components;

accountApp.controller('allUsersCtrl', ['$scope', '$timeout', '$modal', 'ngDataApi', '$cookies', '$localStorage', 'membersHelper', 'isUserLoggedIn',
	function ($scope, $timeout, $modal, ngDataApi, $cookies, $localStorage, membersHelper, isUserLoggedIn) {
		if (!isUserLoggedIn($scope)) {
			$scope.$parent.$emit("loadUserInterface", {});
			$scope.$parent.go("/members/login");
		}
		
		$scope.userCookie = $localStorage.soajs_user;
		$scope.alerts = [];
		$scope.closeAlert = function (index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.closeAllAlerts = function () {
			$timeout(function () {
				$scope.alerts = [];
			}, 15000);
		};
		
		$scope.access = {};
		constructModulePermissions($scope, $scope.access, membersConfig.permissions);
		
		$scope.listMembers = function () {
			membersHelper.listMembers($scope, membersConfig);
		};
		
		$scope.addMember = function () {
			membersHelper.addMember($scope, membersConfig, true);
		};
		
		$scope.editMember = function (data) {
			membersHelper.editMember($scope, membersConfig, data, true)
		};
		
		$scope.activateMembers = function () {
			membersHelper.activateMembers($scope);
		};
		
		$scope.deactivateMembers = function () {
			membersHelper.deactivateMembers($scope);
		};
		
		//call default method
		setTimeout(function () {
			if ($scope.access.adminUser.list) {
				$scope.listMembers($scope);
			}
		}, 50);
		
		$scope.getProjects = function () {
			$scope.projects = {};
			$scope.projects.active = [];
			$scope.projects.names = [];
			overlayLoading.show();
			getSendDataFromServer($scope, ngDataApi, {
				"method": "get",
				"routeName": "/projects/projects/list",
				"params": {}
			}, function (error, data) {
				overlayLoading.hide();
				if (error) {
				}
				else {
					data.forEach(function (project) {
						if (project.status === 'pending') {
							$scope.projects.pending.push(project);
							return;
						}
						$scope.projects.names.push(project.name);
						$scope.projects.active.push(project);
					});
				}
			});
		};

		$scope.getProjects();

	}]);
