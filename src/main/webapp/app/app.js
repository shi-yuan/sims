(function () {
    'use strict';

    /* Init application */
    angular.module('app', ['ngRoute']).config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('noCacheInterceptor');
    }]).factory('noCacheInterceptor', function () {
        return {
            request: function (config) {
                if (config.method == 'GET') {
                    var separator = config.url.indexOf('?') === -1 ? '?' : '&';
                    config.url = config.url + separator + 'noCache=' + new Date().getTime();
                }
                return config;
            }
        };
    });

    /* Common application conroller */
    angular.module('app').controller('ApplicationCtrl', ApplicationCtrl);
    ApplicationCtrl.$inject = ['$scope', '$window', 'AjaxService', '$routeParams'];
    function ApplicationCtrl($scope, $window, AjaxService, $routeParams) {
        // 返回上一页
        $scope.back = function () {
            $window.history.back();
        };

        // 修改密码
        $scope.updatePassword = function (newPassword) {
            var params = {newPassword: newPassword, userId: $routeParams.userId};
            if ('student' == $routeParams.identity) {
                params.identity = "0";
            } else if ('teacher' == $routeParams.identity) {
                params.identity = "1";
            } else {
                params.identity = "2";
            }
            AjaxService.put('/password/update', params, function (data) {
                if (!data.success) {
                    return alert('修改密码失败');
                }
                $scope.back();
            });
        };

        // 退出系统
        $scope.logout = function () {
            AjaxService.post('/logout', function () {
                $window.location.href = "#/login";
            });
        };
    }
})();