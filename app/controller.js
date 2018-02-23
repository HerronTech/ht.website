'use strict';
var app = angular.module('mainWebsite', ['ui.bootstrap', 'ngRoute', 'ngCookies', 'ngStorage', "ui.ace", 'vcRecaptcha']);

var interfaceDomain = location.host;
interfaceDomain = mydomain.split(":")[0];

app.config([
	'$routeProvider',
	'$controllerProvider',
	'$compileProvider',
	'$locationProvider',
	'$filterProvider',
	'$provide',
	'$sceDelegateProvider',
	function ($routeProvider, $controllerProvider, $compileProvider, $locationProvider, $filterProvider, $provide, $sceDelegateProvider) {

		app.compileProvider = $compileProvider;
		navigation.forEach(function (navigationEntry) {
			if (navigationEntry.scripts && navigationEntry.scripts.length > 0) {
				$routeProvider.when(navigationEntry.url.replace('#', ''), {
					templateUrl: navigationEntry.tplPath,
					resolve: {
						load: ['$q', '$rootScope', function ($q, $rootScope) {
							var deferred = $q.defer();
							require(navigationEntry.scripts, function () {
								$rootScope.$apply(function () {
									deferred.resolve();
								});
							});
							return deferred.promise;
						}]
					}
				});
			}
			else {
				if (navigationEntry.tplPath && navigationEntry.tplPath !== '') {
					$routeProvider.when(navigationEntry.url.replace('#', ''), {
						templateUrl: navigationEntry.tplPath
					});
				}
			}
		});

		$routeProvider.otherwise({
			redirectTo: '/'
		});

		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');

		app.components = {
			filter: $filterProvider.register,
			controller: $controllerProvider.register,
			service: $provide.service
		};
	}
]);

app.controller('mainCtrl', ['$scope', '$location', '$routeParams', '$timeout', '$cookies', '$localStorage', 'ngDataApi',
	function ($scope, $location, $routeParams, $timeout, $cookies, $localStorage, ngDataApi) {
		$scope.translation = translation;
		$scope.pageTitle = "";
		$scope.isLoggedInUser = false;

		$scope.go = function (path) {
			if (path) {
				$cookies.put("soajs_current_route", path.replace("#", ""), { 'domain': interfaceDomain });
				$location.path(path.replace("#", ""));
			}
		};

		$scope.$on('refreshPageTitle', function (event, args) {
			$scope.pageTitle = args.title;
		});

		$scope.today = new Date().getTime();

		$scope.goToAnchor = function (section, anchor) {
			$location.path("/" + section + "/" + anchor);
		};

		$scope.$on("loadUserInterface", function (event, args) {
			var user = $localStorage.soajs_user;
			if (user) {
				$scope.userFirstName = user.firstName;
				$scope.userLastName = user.lastName;
				$scope.enableInterface = true;
				$scope.isLoggedInUser = true;
			}
			else {
				$scope.isLoggedInUser = false;
				$scope.enableInterface = false;
			}
		});

		$scope.$on('$routeChangeSuccess', function (event, current, previous) {
			$scope.saasMembers = false;
			$scope.currentLocation = $location.path();
			if ($scope.currentLocation.indexOf('members') !== -1) {
				$scope.saasMembers = true;
			}
			for (var entry = 0; entry < navigation.length; entry++) {
				var urlOnly = navigation[entry].url.replace('/:anchor?', '');
				if (urlOnly === $scope.currentLocation) {
					if (navigation[entry].title && navigation[entry].title !== '') {
						jQuery('head title').html(navigation[entry].title);
					}

					if (navigation[entry].keywords && navigation[entry].keywords !== '') {
						jQuery('head meta[name=keywords]').attr('content', navigation[entry].keywords);
					}

					if (navigation[entry].description && navigation[entry].description !== '') {
						jQuery('head meta[name=description]').attr('content', navigation[entry].description);
					}
				}
			}

			$timeout(function () {
				if ($routeParams.anchor) {
					scrollToID('#' + $routeParams.anchor, 750);

					// $.getScript("https://www.google.com/recaptcha/api.js?onload=myCallBack&render=explicit", function (data, textStatus, jqxhr) {
					// 	$("input[type=submit]").removeAttr("disabled");
					//
					// });
				}
			}, 100);
		});

		$scope.checkUserCookie = function () {
			function getUser(username, cb) {
				var apiParams = {
					"method": "get",
					"routeName": "/urac/account/getUser",
					"headers": {
						"key": apiConfiguration.key
					},
					"params": {
						"username": username
					}
				};
				getSendDataFromServer($scope, ngDataApi, apiParams, function (error, response) {
					if (error) {
						return cb(false);
					}
					else {
						return cb(true);
					}
				});
			}

			if ($cookies.get('access_token', { 'domain': interfaceDomain }) && $localStorage.soajs_user) {
				var user = $localStorage.soajs_user;
				getUser(user.username, function (result) {
					if (!result) {
						ngDataApi.logoutUser($scope);
					}
					$scope.isLoggedInUser = true;
				});
			}
		};

		$scope.checkUserCookie();
		
		$scope.logoutUser = function () {
			var user = $localStorage.soajs_user;
			
			function clearData() {
				ngDataApi.logoutUser($scope);
				$scope.$emit("loadUserInterface", {});
				$scope.go("/members/login");
			}
			
			function logout() {
				overlayLoading.show();
				
				getSendDataFromServer($scope, ngDataApi, {
					"method": "delete",
					"routeName": "/oauth/refreshToken/" + $cookies.get("refresh_token", { 'domain': interfaceDomain }),
					"headers": {
						"key": apiConfiguration.key
					}
				}, function (error, response) {
					
					getSendDataFromServer($scope, ngDataApi, {
						"method": "delete",
						"routeName": "/oauth/accessToken/" + $cookies.get("access_token", { 'domain': interfaceDomain }),
						"headers": {
							"key": apiConfiguration.key
						}
					}, function (error, response) {
						overlayLoading.hide();
						clearData();
					});
				});
			}
			
			if (typeof(user) !== 'undefined') {
				logout();
			}
			else {
				clearData();
			}
		};

	}]);

app.directive('overlay', function () {
	return {
		restrict: 'E',
		templateUrl: 'app/templates/overlay.html'
	};
});

app.directive('topMenu', function () {
	return {
		restrict: 'E',
		templateUrl: 'app/templates/topMenu.html'
	}
});

app.directive('topMenuagility', function () {
	return {
		restrict: 'E',
		templateUrl: 'app/templates/topMenuagility.html'
	}
});

app.directive('innerMenu', function () {
	return {
		restrict: 'E',
		templateUrl: 'app/templates/innerMenu.html'
	}
});

app.directive('saasMenu', function () {
	return {
		restrict: 'E',
		templateUrl: 'app/templates/saasMenu.html'
	}
});

app.filter('trustAsResourceUrl', ['$sce', function ($sce) {
	return function (val) {
		return $sce.trustAsResourceUrl(val);
	};
}]);

app.filter('toTrustedHtml', ['$sce', function ($sce) {
	return function (text) {
		return $sce.trustAsHtml(text);
	};
}]);

var overlayLoading = {
	show: function (cb) {
		var overlayHeight = jQuery(document).height();
		jQuery("#overlayLoading").css('height', overlayHeight + 'px').show();
		jQuery("#overlayLoading .bg").css('height', overlayHeight + 'px').show(100);
		jQuery("#overlayLoading .content").show();
		if (cb && typeof(cb) === 'function') {
			cb();
		}
	},
	hide: function (t, cb) {
		var fT = 200;
		if (t && typeof(t) === 'number') {
			fT = t;
		}
		jQuery("#overlayLoading .content").hide();
		jQuery("#overlayLoading").fadeOut(fT);
		if (cb && typeof(cb) === 'function') {
			cb();
		}
	}
};