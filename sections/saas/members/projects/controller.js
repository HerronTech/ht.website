"use strict";

var accountApp = app.components;

accountApp.controller('memberProjectsCtrl', ['$scope', '$cookies', '$http', '$timeout', '$modal', 'isUserLoggedIn', 'ngDataApi', 'injectFiles',
	function ($scope, $cookies, $http, $timeout, $modal, isUserLoggedIn, ngDataApi, injectFiles) {
		
		$scope.projects = {};
		$scope.projects.active = [];
		$scope.projects.pending = [];
		if (!isUserLoggedIn($scope)) {
			$scope.$parent.$emit("loadUserInterface", {});
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

		$scope.checkPending = function () {
			let reqOptions = {
				"method": "get",
				"routeName": "/bridge/checkPendingProjects",
				"params": {}
			};
			getSendDataFromServer($scope, ngDataApi, reqOptions, function (error, data) {
				overlayLoading.hide();
				$timeout(function () {
					$scope.getList();
				}, 2000);
			});
		};

		$scope.openProject = function (project) {
			$cookies.put('soajs_project', project.name, { 'domain': interfaceDomain });
			var path = cloudUri + '#/dashboard';
			window.open(path, '_blank');
		};
		$scope.editProject = function (project) {
			$cookies.put('soajs_project', project.name, { 'domain': interfaceDomain });
			var path = cloudUri + '#/project/settings';
			window.open(path, '_blank');
		};
		
		$scope.deleteProject = function (project, pending) {
			var formConf = {
				'name': '',
				'label': '',
				'entries': []
			};
			var entry = {
				'name': 'removeResource',
				'label': 'This project uses a MongoDB Atlas resource. Do you wish to delete the resource as well?',
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

			var modalOptions = {
				form: formConf,
				'timeout': $timeout,
				'name': 'confirm',
				'label': "Confirm Project Delete",
				'msgs': {
					"footer": "This move is irreversible! Are you sure you want to proceed?"
				},
				'actions': [
					{
						'type': 'submit',
						'label': 'Confirm Delete',
						'btn': 'primary',
						'action': function (formData) {
							overlayLoading.show();

							let reqOptions = {
								"method": "delete",
								"routeName": "/projects/project",
								"params": {
									"pending": (project.status === 'pending'),
									"project": project.name,
									"removeResource": formData.removeResource
								}
							};
							getSendDataFromServer($scope, ngDataApi, reqOptions, function (error, data) {
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

			if (pending) {
				overlayLoading.show();

				let reqOptions = {
					"method": "delete",
					"routeName": "/projects/project",
					"params": {
						"pending": (project.status === 'pending'),
						"project": project.name
					}
				};
				getSendDataFromServer($scope, ngDataApi, reqOptions, function (error, data) {
					overlayLoading.hide();
					if (error) {
						$scope.alerts.push({
							'type': 'danger',
							'msg': error.message
						});
						$scope.closeAllAlerts();
					}
					else {
						$scope.alerts.push({
							'type': 'success',
							'msg': "Project was deleted successfully."
						});
						$scope.closeAllAlerts();
						$scope.getList();
					}
				});
			}
			else {
				buildFormWithModal($scope, $modal, modalOptions);
			}

		};
		
		$scope.getList = function () {
			$scope.projects.active = [];
			$scope.projects.pending = [];
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
					let projectCount = 0;
					data.forEach(function (project) {
						project.collpased = projectCount > 0;
						projectCount++;
						
						if (project.status === 'pending') {
							$scope.projects.pending.push(project);
							return;
						}
						$scope.projects.active.push(project);
						
						project.mainResource = {};
						project.resources.forEach(function (resource) {
							if (resource.main) {
								project.mainResource = resource;
								let options = {
									"method": "send",
									"routeName": "/bridge/executeDriver",
									"data": {
										type: "resources",
										driver: 'atlas',
										command: "getCluster",
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
										project.mainResource.providerSettings = response.providerSettings;
									}
								});
							}
						});
						
						let i = 0;
						if (project.infra) {
							for (let oneInfra in project.infra) {
								if (!project.infra[oneInfra].deployment || project.infra[oneInfra].deployment.length === 0) {
									delete project.infra[oneInfra];
								}
								else {
									project.infra[oneInfra].hide = (i > 0);
									i++;
								}
							}
							project.infras = Object.keys(project.infra);
						}
					});
				}
			});
		};
		
		$scope.getList();
		
		injectFiles.injectCss("sections/saas/projects.css");
	}]);

accountApp.controller('memberProjectAddCtrl', ['$scope', '$cookies', '$http', '$timeout', '$modal', 'isUserLoggedIn', 'ngDataApi', 'injectFiles',
	function ($scope, $cookies, $http, $timeout, $modal, isUserLoggedIn, ngDataApi, injectFiles) {
		injectFiles.injectCss("sections/saas/projects.css");
		
		if (!isUserLoggedIn($scope)) {
			$scope.$parent.$emit("loadUserInterface", {});
			$scope.$parent.go("/members/login");
		}
		
		$scope.hiddenTableBody = true;
		
		$scope.clusterSettings = {
			"SOA-l7": {
				"storageCapacity": "80 GB",
				"connectivity": "2000",
				"ram": "8 GB",
				"storageIOPs": "240"
			},
			"MC-l7": {
				"storageCapacity": "80 GB",
				"connectivity": "4000",
				"ram": "16 GB",
				"storageIOPs": "240"
			}
		};
		
		$scope.step = {
			"1": true,
			"2": false,
			"3": false,
			"4": false
		};
		
		$scope.data = {
			infraAws: false,
			infraGoogle: false,
			newCluster: false,
			existingCluster: true
		};
		
		$scope.project = {
			name: "",
			description: "",
			infra: {},
			IPentries: [],
			resource: {
				deployCluster: false,
				driver: 'atlas',
				projectName: '',
				clusterName: '',
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
		
		$scope.alerts = [];
		$scope.closeAlert = function (index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.closeAllAlerts = function () {
			$timeout(function () {
				$scope.alerts = [];
			}, 30000);
		};
		
		$scope.goToStep = function (number, form) {
			if (form) {
				if (!form.$valid) {
					form.$submitted = true;
					return;
				}
			}
			$scope.step = {
				"1": false,
				"2": false,
				"3": false,
				"4": false
			};
			$scope.step[number] = true;
		};
		
		$scope.setInfra = function (infra) {
			$scope.data.infra = infra;
			if (infra === 'aws') {
				$scope.data.infraAws = true;
				$scope.data.infraGoogle = false;
				delete $scope.project.infra.google;
				if (!$scope.project.infra.aws) {
					$scope.project.infra.aws = {
						api: {
							"keyId": ""
						}
					};
				}
			}
			if (infra === 'google') {
				$scope.data.infraGoogle = true;
				$scope.data.infraAws = false;
				if (!$scope.project.infra.google) {
					$scope.project.infra.google = {
						api: {
							"project": "",
							"token": ""
						}
					};
				}
				delete $scope.project.infra.aws;
			}
		};
		
		$scope.validateInfra = function () {
			$scope.alerts = [];
			var myToken;
			if ($scope.project.infra.google && $scope.project.infra.google.api) {
				if ($scope.project.infra.google.api.token) {
					try {
						myToken = JSON.parse($scope.project.infra.google.api.token);
						$scope.goToStep('3');
					}
					catch (e) {
						$scope.alerts.push({
							'type': 'danger',
							'msg': e.message
						});
					}
				}
			}
			else {
				$scope.goToStep('3');
			}
		};
		
		$scope.whiteListIps = function (form) {
			form.$submitted = true;
			if (!form.$valid) {
				return;
			}
			$scope.alerts = [];
			overlayLoading.show();
			getSendDataFromServer($scope, ngDataApi, {
				"method": "post",
				"routeName": "/projects/project/whitelist",
				"data": {
					data: $scope.project
				},
				"params": {}
			}, function (error, data) {
				overlayLoading.hide();
				if (error) {
					$scope.alerts.push({
						'type': 'danger',
						'msg': error.message
					});
				}
				else {
					$scope.alerts.push({
						'type': 'success',
						'msg': "Ips added"
					});
				}
			});
		};
		
		$scope.submitProject = function (form) {
			let successMsg = "Your project was created. It might take up to 10 minutes to be available in your active projects";
			form.$submitted = true;
			if (!form.$valid) {
				return;
			}
			$scope.alerts = [];
			if ($scope.project.infra.google && $scope.project.infra.google.api) {
				if ($scope.project.infra.google.api.token) {
					try {
						$scope.project.infra.google.api.token = JSON.parse($scope.project.infra.google.api.token);
					}
					catch (e) {
						$scope.alerts.push({
							'type': 'danger',
							'msg': e.message
						});
					}
				}
			}
			
			overlayLoading.show();
			getSendDataFromServer($scope, ngDataApi, {
				"method": "post",
				"routeName": "/projects/project",
				"data": {
					data: $scope.project
				},
				"params": {}
			}, function (error, data) {
				overlayLoading.hide();
				if (error) {
					$scope.alerts.push({
						'type': 'danger',
						'msg': error.message
					});
				}
				else {
					$scope.alerts.push({
						'type': 'success',
						'msg': successMsg
					});
					$scope.goToStep('4');
					$timeout(function () {
						$scope.$parent.go("/members/projects");
					}, 6000);
				}
			});
		};
		
		$scope.setCluster = function (isNew) {
			if (isNew) {
				$scope.data.newCluster = true;
				$scope.data.existingCluster = false;
				$scope.project.resource.clusterConfig = {};
				// $scope.project.resource.deployCluster = true;
			} else {
				$scope.data.newCluster = false;
				$scope.data.existingCluster = true;
				// $scope.project.resource.deployCluster = false;
			}
		};
		
		
	}]);