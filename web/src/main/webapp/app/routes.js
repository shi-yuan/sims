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
            // 查看选题情况
            when('/manager/topic', {
                templateUrl: 'templates/main/manager/topic.html',
                controller: 'ManagerCtrl',
                controllerAs: 'manager'
            }).

            // 教师
            // ====================
            // 主页
            when('/teacher/index', {
                templateUrl: 'templates/main/teacher/index.html',
                controller: 'TeacherCtrl',
                controllerAs: 'teacher'
            }).
            // 毕设题目管理
            when('/teacher/topic', {
                templateUrl: 'templates/main/teacher/topic.html',
                controller: 'TeacherCtrl',
                controllerAs: 'teacher'
            }).

            // 学生
            // ====================
            // 主页
            when('/student/index', {
                templateUrl: 'templates/main/student/index.html',
                controller: 'StudentCtrl',
                controllerAs: 'student'
            }).
            // 选择毕设题目
            when('/student/topic', {
                templateUrl: 'templates/main/student/topic.html',
                controller: 'StudentCtrl',
                controllerAs: 'student'
            }).

            otherwise({
                redirectTo: '/login'
            });
    }
})();