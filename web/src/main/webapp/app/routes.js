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
            // 学生管理
            when('/manager/student', {
                templateUrl: 'templates/main/manager/student.html',
                controller: 'ManagerCtrl',
                controllerAs: 'manager'
            }).
            // 教师管理
            when('/manager/teacher', {
                templateUrl: 'templates/main/manager/teacher.html',
                controller: 'ManagerCtrl',
                controllerAs: 'manager'
            }).

            otherwise({
                redirectTo: '/'
            });
    }
})();