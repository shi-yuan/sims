(function () {
    'use strict';

    angular.module('app').controller('TeacherCtrl', TeacherCtrl);
    TeacherCtrl.$inject = ['$scope', 'AjaxService'];
    function TeacherCtrl($scope, AjaxService) {
        // 获取毕设题目列表
        $scope.topicList = function () {
            AjaxService.get('/teacher/topic/list', function (data) {
                if (data.success) {
                    $scope.topics = data.data.topics;
                } else {
                    alert('获取毕设题目列表失败');
                }
            });
        };
        // 新增毕设题目
        $scope.topicCreate = function () {
            $.dialog({
                url: "/teacher/topic/view",
                params: {},
                load: function () {
                    // 提交表单
                    $("form").on("submit", function (event) {
                        event.preventDefault();
                        AjaxService.post('/teacher/topic/create', $('form').serialize(), function (data) {
                            if (data.success) {
                                $('#btnClose').click();
                            } else {
                                alert('新增毕设题目失败');
                            }
                        });
                    });
                },
                close: function () {
                    $scope.topicList();
                }
            });
        };
    }
})();