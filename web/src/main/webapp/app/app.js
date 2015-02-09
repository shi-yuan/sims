(function () {
    'use strict';

    /* Init application */
    angular.module('app', ['ngRoute']);

    /* Common application conroller */
    angular.module('app').controller('ApplicationCtrl', ApplicationCtrl);
    ApplicationCtrl.$inject = ['$window'];
    function ApplicationCtrl($window) {
    }
})();