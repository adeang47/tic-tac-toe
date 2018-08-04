(function () {
    'use strict';
    angular
        .module('app.routes')
        .config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
            function ($locationProvider, $stateProvider, $urlRouterProvider) {

                $stateProvider
                    .state('startGame', {
                        url: '/games/start',
                        controller: 'StartGameController',
                        controllerAs: 'startGameCtrl',
                        templateUrl: 'templates/games/startGame.html',
                    })
                    .state('index', {
                        url: '/',
                        templateUrl: 'templates/app/index/html'
                    })
            }]);
})();