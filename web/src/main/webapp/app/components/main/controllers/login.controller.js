(function () {
    'use strict';

    angular.module('app').controller('LoginCtrl', LoginCtrl);
    LoginCtrl.$inject = ['$scope', 'AjaxService', '$window'];
    function LoginCtrl($scope, AjaxService, $window) {
        $scope.form = {};

        // 身份列表
        $scope.identities = [
            {name: '学生', value: 0},
            {name: '教师', value: 1},
            {name: '管理员', value: 2}
        ];

        // 登录
        $scope.login = function () {
            AjaxService.post('/login', $scope.form, function (data) {
                if (data.success) {
                    var identity = $scope.form.identity;
                    if (0 == identity) {
                        $window.location.href = '#/student/index';
                    } else if (1 == identity) {
                        $window.location.href = '#/teacher/index';
                    } else {
                        $window.location.href = '#/manager/index';
                    }
                } else {
                    alert('用户名/密码错误');
                }
            });
        }
    }
})();