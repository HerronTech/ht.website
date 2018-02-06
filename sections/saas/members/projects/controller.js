"use strict";

var accountApp = app.components;

accountApp.controller('memberProjectsCtrl', ['$scope', '$cookies', '$http', '$timeout', '$modal', 'isUserLoggedIn', 'ngDataApi', 'injectFiles',
	function ($scope, $cookies, $http, $timeout, $modal, isUserLoggedIn, ngDataApi, injectFiles) {
		
		$scope.projects = [];
		if (!isUserLoggedIn($scope)) {
			$scope.$parent.go("/members/login");
		}
		
		$scope.alerts = [];
		$scope.closeAlert = function (index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.closeAllAlerts = function () {
			$timeout(function () {
				$scope.alerts = [];
			}, 30000);
		};
		
		$scope.openProject = function (project) {
			$cookies.put('project', project.name, { 'domain': interfaceDomain });
			var path = cloudUri + '#/dashboard';
			window.open(path, '_blank');
		};
		$scope.editProject = function (project) {
			$cookies.put('project', project.name, { 'domain': interfaceDomain });
			var path = cloudUri + '#/project/settings';
			window.open(path, '_blank');
		};
		
		$scope.deleteProject = function (project) {
			var formConf = {
				'name': '',
				'label': '',
				'entries': []
			};
			
			var entry = {
				'name': 'removeResource',
				'label': 'We found this project is using resources. Do you wish to delete the resource also?',
				'type': 'radio',
				'placeholder': '',
				'value': [
					{
						l: 'Delete the resource', v: true
					},
					{
						l: 'Keep the resource', v: false
					}
				],
				'tooltip': '',
				'required': true
			};
			if (project.resources && project.resources.length !== 0) {
				formConf.entries.push(entry);
			}
			var options = {
				form: formConf,
				'timeout': $timeout,
				'name': 'confirm',
				'label': "Confirm Project Delete",
				'msgs': {
					"footer": "This move is irreversible! Are you sure you want to delete this project and all its Deployments?"
				},
				'actions': [
					{
						'type': 'submit',
						'label': 'Confirm Delete',
						'btn': 'primary',
						'action': function (formData) {
							overlayLoading.show();
							getSendDataFromServer($scope, ngDataApi, {
								"method": "delete",
								"routeName": "/projects/project",
								"params": {
									"project": project.name,
									"removeResource": formData.removeResource
								}
							}, function (error, data) {
								overlayLoading.hide();
								if (error) {
									$scope.form.displayAlert('danger', error.message);
								}
								else {
									$scope.modalInstance.close();
									$scope.form.formData = {};
									$scope.alerts.push({
										'type': 'success',
										'msg': "Project was deleted successfully."
									});
									$scope.closeAllAlerts();
									$scope.getList();
								}
							});
						}
					},
					{
						'type': 'reset',
						'label': translation.cancel[LANG],
						'btn': 'danger',
						'action': function () {
							$scope.modalInstance.dismiss('cancel');
							$scope.form.formData = {};
						}
					}
				]
			};
			buildFormWithModal($scope, $modal, options);
			
		};
		
		$scope.getList = function () {
			overlayLoading.show();
			getSendDataFromServer($scope, ngDataApi, {
				"method": "get",
				"routeName": "/projects/project/list",
				"params": {}
			}, function (error, data) {
				overlayLoading.hide();
				if (error) {
					$scope.alerts.push({
						'type': 'danger',
						'msg': error.message
					});
					$scope.closeAllAlerts();
				}
				else {
					$scope.projects = data;
					data.forEach(function (project) {
						project.mainResource = {};
						project.resources.forEach(function (resource) {
							if (resource.main) {
								project.mainResource = resource;
								let options = {
									"method": "send",
									"routeName": "/bridge/executeDriver",
									"data": {
										"type": "resources",
										"driver": 'atlas',
										'command': "getCluster",
										project: project.name,
										options: {
											clusterName: project.resources[0].api.clusterName
										}
									}
								};
								getSendDataFromServer($scope, ngDataApi, options, function (error, response) {
									if (error) {
										console.log(error);
									} else {
										console.log(response);
										project.mainResource.providerSettings = response.providerSettings;
									}
								});
							}
						});
					});
				}
			});
		};
		
		$scope.getList();
		
		injectFiles.injectCss("sections/saas/members/projects/projects.css");
	}]);

accountApp.controller('memberProjectAddCtrl', ['$scope', '$cookies', '$http', '$timeout', '$modal', 'isUserLoggedIn', 'ngDataApi', 'injectFiles',
	function ($scope, $cookies, $http, $timeout, $modal, isUserLoggedIn, ngDataApi, injectFiles) {
		injectFiles.injectCss("sections/saas/members/projects/projects.css");
		
		$scope.data = {
			infraAws: false,
			infraGoogle: false,
			infra: "",
			newCluster: false,
			existingCluster: false
		};
		
		$scope.project = {
			name: "",
			infra: {},
			IPentries: [],
			resource: {
				driver: 'atlas',
				api: {
					orgId: '',
					username: '',
					token: ''
				},
				credentials: {
					username: '',
					password: ''
				}
			}
		};
		if (!isUserLoggedIn($scope)) {
			$scope.$parent.go("/members/login");
		}
		
		$scope.alerts = [];
		$scope.closeAlert = function (index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.closeAllAlerts = function () {
			$timeout(function () {
				$scope.alerts = [];
			}, 30000);
		};
		
		
		$scope.setInfra = function (infra) {
			$scope.data.infra = infra;
			if (infra === 'aws') {
				$scope.data.infraAws = true;
				$scope.data.infraGoogle = false;
				delete $scope.project.infra.google;
				$scope.project.infra.aws = {
					api: {
						"keyId": ""
					}
				};
			}
			if (infra === 'google') {
				$scope.data.infraGoogle = true;
				$scope.data.infraAws = false;
				$scope.project.infra.google = {
					api: {
						"project": "",
						"token": {
							"project_id": "",
							"private_key": "",
							"client_email": "",
							"client_id": ""
						}
					}
				};
				delete $scope.project.infra.aws;
			}
			console.log($scope.data);
		};
		
		$scope.submitProject = function (project) {
			console.log($scope.project);
		};
		$scope.setCluster = function (isNew) {
			if (isNew) {
				$scope.data.newCluster = true;
				$scope.data.existingCluster = false;
				$scope.project.resource.clusterConfig = {
					numShards: 1,
					autoScaling: {
						"diskGBEnabled": true
					},
					backupEnabled: false,
					mongoDBMajorVersion: "3.4",
					providerSettings: {}
				};
				// $scope.project.resource.deployCluster = true;
			} else {
				$scope.data.newCluster = false;
				$scope.data.existingCluster = true;
				// $scope.project.resource.deployCluster = false;
			}
			console.log('isNew', isNew);
		};
		
		
	}]);