(function () {
    'use strict';

    angular.module('app').controller('ManagerCtrl', ManagerCtrl);
    ManagerCtrl.$inject = ['$scope', 'AjaxService'];
    function ManagerCtrl($scope, AjaxService) {
        // 学生管理
        // ====================
        // 获取学生列表
        $scope.studentList = function () {
            AjaxService.get('/manager/student/list', function (data) {
                if (data.success) {
                    $scope.students = data.data.students;
                } else {
                    alert('获取学生列表失败');
                }
            });
        };
        // 新增学生页面
        $scope.studentCreate = function () {
            $.dialog({
                url: "/manager/student/view",
                params: {},
                load: function () {
                    // 提交表单
                    $("form").on("submit", function (event) {
                        event.preventDefault();
                        AjaxService.post('/manager/student/create', $('form').serialize(), function (data) {
                            if (data.success) {
                                $('#btnClose').click();
                            } else {
                                alert('新增学生信息失败');
                            }
                        });
                    });
                },
                close: function () {
                    $scope.studentList();
                }
            });
        };

        // 教师管理
        // ====================
        // 获取教师列表
        $scope.teacherList = function () {
            AjaxService.get('/manager/teacher/list', function (data) {
                if (data.success) {
                    $scope.teachers = data.data.teachers;
                } else {
                    alert('获取教师列表失败');
                }
            });
        };
        // 新增教师页面
        $scope.teacherCreate = function () {
            $.dialog({
                url: "/manager/teacher/view",
                params: {},
                load: function () {
                    // 提交表单
                    $("form").on("submit", function (event) {
                        event.preventDefault();
                        AjaxService.post('/manager/teacher/create', $('form').serialize(), function (data) {
                            if (data.success) {
                                $('#btnClose').click();
                            } else {
                                alert('新增教师信息失败');
                            }
                        });
                    });
                },
                close: function () {
                    $scope.teacherList();
                }
            });
        };
    }
})();