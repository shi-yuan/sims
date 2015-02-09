(function () {
    'use strict';

    angular.module('app').controller('ManagerCtrl', ManagerCtrl);
    ManagerCtrl.$inject = ['$scope', 'AjaxService', '$window'];
    function ManagerCtrl($scope, AjaxService, $window) {
        // 返回上一页
        $scope.back = function () {
            $window.history.back();
        };

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
    }
})();