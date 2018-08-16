"use strict";
var accountApp = app.components;
var interfaceDomain = location.host;
interfaceDomain = mydomain.split(":")[0];

accountApp.controller('storeCtrl', ['$scope', '$http', 'injectFiles', 'ngDataApi', '$timeout', '$cookies', '$location', '$modal',
    function ($scope, $http, injectFiles, ngDataApi, $timeout, $cookies, $location, $modal) {
        injectFiles.injectCss("sections/saas/projects.css");
        let options = [];
        let count = -1;
        $scope.alerts = [];
        $scope.allCatalogs = [];
        $scope.data = {
            selected: {}
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.closeAllAlerts = function () {
            $timeout(function () {
                $scope.alerts = [];
            }, 30000);
        };

        $scope.listAllCatalogs = function (conditions, types) {
            count++;
            let options = {
                "method": "get",
                "routeName": "/store/list",
                "params": {}
            };

            if (conditions) {
                options.params = {
                    'conditions[]': conditions,
                    'types' : types
                }
            }

            $scope.alerts = [];
            getSendDataFromServer($scope, ngDataApi, options, function (error, response) {
                if (error) {
                    $scope.alerts.push({
                        'type': 'danger',
                        'msg': error.message
                    });
                    $scope.closeAllAlerts();
                }
                else {
                    $scope.noCdCatalogs = false;
                    $scope.noCiCatalogs = false;
                    $scope.noTempCatalogs = false;
                    $scope.noInfraCatalogs = false;

                    if ($scope.allCatalogs.length === 0) {
                        $scope.allCatalogs = angular.copy(response);
                    }
                    if (response && response.length === 0) {
                        response = angular.copy($scope.allCatalogs);
                        $scope.noCatalogs = true;
                    } else {
                        $scope.noCatalogs = false;
                    }

                    $scope.catalogs = {
                        ci: [],
                        cd: [],
                        envTemplate: [],
                        infra: []
                    };
                    let ci = [];
                    response.forEach((oneCtlg) => {
                        if (oneCtlg.type === 'ci') {
                            $scope.catalogs.ci.push(oneCtlg);
                        }
                        if (oneCtlg.type === 'cd') {
                            $scope.catalogs.cd.push(oneCtlg);
                        }
                        if (oneCtlg.type === '_template') {
                            $scope.catalogs.envTemplate.push(oneCtlg);
                        }
                        if (oneCtlg.type === '_infra') {
                            $scope.catalogs.infra.push(oneCtlg);
                        }
                    });
                    if ($scope.catalogs.cd.length === 0) {
                        $scope.noCdCatalogs = true;
                    }
                    if ($scope.catalogs.ci.length === 0) {
                        $scope.noCiCatalogs = true;
                    }
                    if ($scope.catalogs.envTemplate.length === 0) {
                        $scope.noTempCatalogs = true;
                    }
                    if ($scope.catalogs.infra.length === 0) {
                        $scope.noInfraCatalogs = true;
                    }
                    if (count === 0) {
                        $scope.manageLeftMenu()
                    }
                }
            });
        };

        $scope.manageLeftMenu = function () {
            let leftMenu = {
                ci: {},
                cd: {},
                _template: {},
                _infra: {}
            };
            let finalResult;
            let types = ['ci', 'cd', '_template', '_infra'];
            types.forEach((oneType) => {
                $scope.allCatalogs.forEach((catalog) => {
                    if (catalog.type === oneType) {
                        catalog.filters.forEach((filter) => {
                            filter.option.forEach((oneOption) => {
                                if (!leftMenu[oneType][filter.category]) {
                                    leftMenu[oneType][filter.category] = [];
                                }
                                if (leftMenu[oneType][filter.category].indexOf(oneOption) === -1) {
                                    leftMenu[oneType][filter.category].push(oneOption);
                                }
                            })
                        })
                    }
                });
            });
            $scope.leftMenu = leftMenu;
        };

        $scope.download = function (id) {
            let options = {
                "method": "get",
                "routeName": "/store/download",
                "params": {
                    "id": id
                },
                "responseType": 'arraybuffer',
            };
            $scope.alerts = [];
            overlayLoading.show();
            getSendDataFromServer($scope, ngDataApi, options, function (error, response) {
                overlayLoading.hide();
                if (error) {
                    if (error.code && error.code === 601) {
                        $modal.open({
                            templateUrl: "loginPage.tmpl",
                            size: 'lg',
                            backdrop: true,
                            keyboard: true,
                            controller: function ($scope, $modalInstance) {
                                $scope.go = function (path) {
                                    if (path) {
                                        $cookies.put("store_path", "/store", {'domain': interfaceDomain});
                                        $location.path(path);
                                        $modalInstance.close();
                                    }
                                };
                                $scope.cancel = function () {
                                    $modalInstance.close();
                                }
                            }
                        });
                    } else {
                        $scope.alerts.push({
                            'type': 'danger',
                            'msg': error.message
                        });
                    }
                    $scope.closeAllAlerts();
                } else {
                    openSaveAsDialog("store_" + new Date().toISOString() + ".zip", response, "application/zip")
                }
            });
        };

        $scope.filter = function (category, option, check, type) {
            if (check) {
                options.push(category + '__' + option);
            } else {
                if (options.indexOf(category + '__' + option) !== -1) {
                    options.splice(options.indexOf(category + '__' + option), 1);
                }
            }
            let condition = [];
            let types = ['cd', 'ci', '_infra', '_template'];
            types.splice(types.indexOf(type), 1);
            for (let i = 0; i < options.length; i++) {
                condition.push({
                    "filters.category": options[i].split('__')[0],
                    "filters.option": options[i].split('__')[1]
                });
            }

            if (condition && condition.length > 0) {
                $scope.listAllCatalogs(condition, types)
            } else {
                $scope.listAllCatalogs()
            }
        };

        $scope.cleanFilter = function () {
            options = [];
            $scope.data = {
                selected: {}
            };
            $scope.listAllCatalogs();
        };

        $scope.listAllCatalogs();
        

        function openSaveAsDialog(filename, content, mediaType) {
            var blob = new Blob([content], {type: mediaType});
            var URL = window.URL || window.webkitURL;
            var objectUrl = URL.createObjectURL(blob);

            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = objectUrl;
            a.download = filename;
            a.click();
        }
    }]);