"use strict";
var accountApp = app.components;

accountApp.controller('storeCtrl', ['$scope', '$http', 'injectFiles', 'ngDataApi', '$timeout', '$cookies', '$localStorage', 'isUserLoggedIn',
    function ($scope, $http, injectFiles, ngDataApi, $timeout, $cookies, $localStorage, isUserLoggedIn) {
        injectFiles.injectCss("sections/saas/projects.css");

        $scope.listAllCatalogs = function () {
            let options = {
                "method": "get",
                "routeName": "/store/list",
                "params": {}
            };

            $scope.alerts = [];
            overlayLoading.show();
            getSendDataFromServer($scope, ngDataApi, options, function (error, response) {
                overlayLoading.hide();
                if (error) {
                    $scope.alerts.push({
                        'type': 'danger',
                        'msg': error.message
                    });
                }
                else {
                    $scope.allCatalogs = response;
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

                   // $scope.manageLeftMenu(() => {
                        $scope.alerts.push({
                            'type': 'success',
                            'msg': "Done"
                        });
                 //   });
                }
            });
        };
        //
        // $scope.manageLeftMenu = function (cb) {
        //     let leftMenu = {
        //         ci : [],
        //         cd:[],
        //         _template:[],
        //         _infra : []
        //     };
        //     let finalResult;
        //     let types = ['ci', 'cd', '_template', '_infra'];
        //     types.forEach((oneType) => {
        //         $scope.allCatalogs.forEach((catalog) => {
        //             if (catalog.type === oneType) {
        //                 catalog.filters.forEach((filter) => {
        //                     filter.option.forEach((oneOption) => {
        //                         if (!leftMenu[oneType][filter.category]) {
        //                             leftMenu[oneType][filter.category] = [];
        //                         }
        //                         if (leftMenu[oneType][filter.category].indexOf(oneOption) === -1) {
        //                             leftMenu[oneType][filter.category].push(oneOption);
        //                         }
        //                     })
        //                 })
        //             }
        //         });
        //     });
        //     $scope.leftMenu = leftMenu;
        //     return cb();
        // };
        $scope.listAllCatalogs();
    }]);