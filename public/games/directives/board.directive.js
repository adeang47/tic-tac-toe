(function () {
    'use strict';
    angular
        .module('games.directives')
        .directive('board', function () {
                return {
                    restrict: 'E',
                    transclude: true,
                    scope: {
                        size: '=',
                        players: '=',
                        endGame: '&'
                    },
                    controller: 'BoardController',
                    templateUrl: 'templates/games/board.html'
                }
            }
        )
})();
