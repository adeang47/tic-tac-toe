(function () {
    'use strict';
    angular.module('app', ['app.routes' ,'games', 'ui.bootstrap']);
    angular.module('app.routes', ['ui.router']);
    angular.module('games', []);
    //angular.module('users', []);

    angular
        .module('app')
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.xsrfCookieName = 'csrftoken';
            $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        }]);

})();