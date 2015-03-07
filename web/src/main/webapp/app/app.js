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
    ApplicationCtrl.$inject = ['$scope', '$window', 'AjaxService'];
    function ApplicationCtrl($scope, $window, AjaxService) {
        // 返回上一页
        $scope.back = function () {
            $window.history.back();
        };

        // 退出系统
        $scope.logout = function () {
            AjaxService.post('/logout', function () {
                $window.location.href = "#/login";
            });
        };
    }
})();