(function () {
    'use strict';

    angular.module('app').controller('StudentCtrl', StudentCtrl);
    StudentCtrl.$inject = ['$scope', 'AjaxService'];
    function StudentCtrl($scope, AjaxService) {
        // 获取我的毕设题目和毕设题目列表
        $scope.topicList = function () {
            AjaxService.get('/student/topic/list', function (data) {
                if (data.success) {
                    $scope.myTopic = data.data.myTopic;
                    $scope.topics = data.data.topics;
                } else {
                    alert('获取毕设题目列表失败');
                }
            });
        };

        // 选题
        $scope.selectTopic = function (topicId) {
            AjaxService.put('/student/topic/select', {topicId: topicId}, function (data) {
                if (!data.success) {
                    alert(data.message);
                }
                $scope.topicList();
            });
        };
    }
})();