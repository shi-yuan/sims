(function () {
    'use strict';

    angular.module('app').service('AjaxService', ['$http', function ($http) {
        return ['get', 'post', 'put', 'delete'].reduce(function (prev, curr) {
            prev[curr] = function (url, dataObj, callback) {
                if ('function' == typeof dataObj) {
                    callback = dataObj;
                    dataObj = null;
                }
                $http(angular.extend({
                    'url': url,
                    'method': curr,
                    'headers': {'Content-Type': 'application/x-www-form-urlencoded'}
                }, 'get' == curr ? {'params': dataObj || {}} : {'data': 'object' == typeof dataObj ? $.param(dataObj || {}) : dataObj}))
                    .then(function (response) {
                        if (response.status = 200) {
                            callback(response.data);
                        } else {
                            alert('网络连接出现异常!');
                        }
                    });
            };
            return prev;
        }, {});
    }]);
})();