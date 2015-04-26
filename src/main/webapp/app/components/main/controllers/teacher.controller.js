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
        // 编辑毕设题目
        $scope.topicUpdate = function (id) {
            $.dialog({
                url: "/teacher/topic/view",
                params: {},
                load: function () {
                    // 加载毕设题目
                    AjaxService.get('/teacher/topic/show', {id: id}, function (data) {
                        if (data.success) {
                            // 初始化表单域
                            angular.forEach(data.data.topic, function (value, key) {
                                $('input[name="' + key + '"]').val(value);
                                if ('describe' == key) {
                                    $('textarea[name="describe"]').val(value);
                                }
                            });
                        } else {
                            alert('获取毕设题目失败');
                        }
                    });
                    // 提交表单
                    $("form").on("submit", function (event) {
                        event.preventDefault();
                        AjaxService.put('/teacher/topic/update', $('form').serialize(), function (data) {
                            if (data.success) {
                                $('#btnClose').click();
                            } else {
                                alert('编辑毕设题目失败');
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