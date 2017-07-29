var app = angular.module('skeletor', ['ui.router', 'ngMaterial', 'Skeletor.controllers', 'googleplus', 'LocalStorageModule']);

app.config(['GooglePlusProvider', function(GooglePlusProvider) {
  GooglePlusProvider.setScopes('https://www.googleapis.com/auth/userinfo.email');
  GooglePlusProvider.init({
    clientId: '868006105062-c4p6rdb08oahoibelq9imsi29r5kiqrm.apps.googleusercontent.com'
  });
}]);

app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('skeletor');
});

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
    .state({
      name : 'dashboard',
      url : '/',
      templateUrl : 'views/dashboard.html',
      controller : 'DashboardController'
    })
    .state({
      name : 'dealers',
      url : '/dealers',
      templateUrl : 'views/dealers.html',
      controller : 'DealersController'
    })
    .state({
      name : 'dealer',
      url : '/dealers/:id',
      templateUrl : 'views/dealer.html',
      controller : 'DealerController'
    })
    .state({
      name : 'customers',
      url : '/customers',
      templateUrl : 'views/customers.html',
      controller : 'CustomersController'
    })
    .state({
      name : 'customer',
      url : '/customers/:id',
      templateUrl : 'views/customer.html',
      controller : 'CustomerController'
    })
    .state({
      name: 'sites',
      url : '/sites',
      templateUrl : 'views/sites.html',
      controller : 'SitesController'
    })
    .state({
      name : 'site',
      url : '/site/:id',
      templateUrl : 'views/site.html',
      controller : 'SiteController'
    })
    .state({
      name : 'system',
      url : '/system/:id',
      templateUrl : 'views/system.html',
      controller : 'SystemController'
    })
    .state({
      name : 'users',
      url : '/users',
      templateUrl : 'views/users.html',
      controller : 'UsersController'
    })
    .state({
      name : 'user',
      url : '/users/:id',
      templateUrl : 'views/user.html',
      controller : 'UserController'
    })
    .state({
      name : 'roles',
      url : '/roles',
      templateUrl : 'views/roles.html',
      controller : 'RolesController'
    })
    .state({
      name : 'role',
      url : '/roles/:id',
      templateUrl : 'views/role.html',
      controller : 'RoleController'
    })
    .state({
      name : 'permissions',
      url : '/permissions',
      templateUrl : 'views/permissions.html',
      controller : 'PermissionsController'
    })
    .state({
      name : 'permission',
      url : '/permissions/:id',
      templateUrl : 'views/permission.html',
      controler : 'PermissionController'
    })
    .state({
      name : 'login',
      url : '/login',
      templateUrl : 'views/login.html',
      controller : 'LoginController',
      onEnter : function($rootScope) {
        $rootScope.$broadcast('ToLogin');
      },
      onExit : function($rootScope) {
        $rootScope.$broadcast('LeaveLogin');
      }
    });

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);

});
