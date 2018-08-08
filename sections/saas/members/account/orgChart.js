"use strict";
var accountApp = app.components;

accountApp.controller('allUsersCtrl', ['$scope', '$timeout', '$cookies', '$localStorage', 'ngDataApi', 'isUserLoggedIn',
	function ($scope, $timeout, $cookies, $localStorage, ngDataApi, isUserLoggedIn) {
		if (!isUserLoggedIn($scope)) {
			$scope.$parent.$emit("loadUserInterface", {});
			$scope.$parent.go("/members/login");
		}

		$scope.access = {};
		constructModulePermissions($scope, $scope.access, membersConfig.permissions);

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
						$scope.projects.names.push(project.name);
						if (project.status === 'pending') {
							return;
						}
						$scope.projects.active.push(project);
					});
				}
			});
		};

		$scope.getProjects();
	}]);

accountApp.controller('membersCtrl', ['$scope', '$timeout', '$modal', 'ngDataApi', '$cookies', '$localStorage', 'membersHelper', 'isUserLoggedIn',
	function ($scope, $timeout, $modal, ngDataApi, $cookies, $localStorage, membersHelper, isUserLoggedIn) {
		
		$scope.members = angular.extend($scope);
		$scope.members.access = $scope.$parent.access;
		
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

		$scope.$parent.$on('reloadMembers', function (event) {
			$scope.members.listMembers($scope.members);
		});

		$scope.members.listMembers = function () {
			membersHelper.listMembers($scope.members, membersConfig);
		};
		
		$scope.members.addMember = function () {
			membersHelper.addMember($scope.members, membersConfig);
		};
		
		$scope.members.editMember = function (data) {
			membersHelper.editMember($scope.members, membersConfig, data)
		};
		
		$scope.members.activateMembers = function () {
			membersHelper.activateMembers($scope.members);
		};
		
		$scope.members.deactivateMembers = function () {
			membersHelper.deactivateMembers($scope.members);
		};
		
		//call default method
		setTimeout(function () {
			if ($scope.members.access.adminUser.list) {
				$scope.members.listMembers();
			}
		}, 50);
	}]);

accountApp.controller('groupsCtrl', ['$scope', 'groupsHelper', function ($scope, groupsHelper) {
	$scope.key = apiConfiguration.key;
	$scope.groups = angular.extend($scope);
	$scope.groups.access = $scope.$parent.access;
	
	$scope.alerts = [];
	$scope.closeAlert = function (index) {
		$scope.alerts.splice(index, 1);
	};
	
	$scope.closeAllAlerts = function () {
		$timeout(function () {
			$scope.alerts = [];
		}, 15000);
	};
	
	$scope.groups.listGroups = function () {
		groupsHelper.listGroups($scope.groups, groupsConfig);
	};
	
	$scope.groups.addGroup = function () {
		groupsHelper.addGroup($scope.groups, groupsConfig);
	};
	
	$scope.groups.editGroup = function (data) {
		groupsHelper.editGroup($scope.groups, groupsConfig, data);
	};
	
	$scope.groups.deleteGroups = function () {
		groupsHelper.deleteGroups($scope.groups);
	};
	
	$scope.groups.delete1Group = function (data) {
		groupsHelper.delete1Group($scope.groups, data);
	};
	
	$scope.groups.assignUsers = function (data) {
		groupsHelper.assignUsers($scope.groups, groupsConfig, data, function () {
			$scope.groups.$parent.$emit("reloadMembers", {});
		});
	};
	
	setTimeout(function () {
		if ($scope.groups.access.adminGroup.list) {
			$scope.groups.listGroups();
		}
	}, 200);
	
}]);
