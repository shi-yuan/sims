(function () {
    'use strict';

    angular.module('app').config(Routes);
    Routes.$inject = ['$routeProvider'];
    function Routes($routeProvider) {
        $routeProvider.
            // 登录
            // ====================
            when('/login', {
                templateUrl: 'templates/main/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            }).

            // 管理员
            // ====================
            // 主页
            when('/manager/index', {
                templateUrl: 'templates/main/manager/index.html',
                controller: 'ManagerCtrl',
                controllerAs: 'manager'
            }).
            when('/manager/student', {
                templateUrl: 'templates/main/manager/student.html',
                controller: 'ManagerCtrl',
                controllerAs: 'manager'
            }).

            otherwise({
                redirectTo: '/login'
            });
    }
})();