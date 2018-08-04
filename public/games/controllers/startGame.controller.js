(function () {
    'use strict';
    angular
        .module('games.controllers')
        .controller('StartGameController', function ($scope) {

            $scope.makeNewGame = true;
            $scope.gameTypes = {0: 'Comp vs. Comp', 1: '1 Player', 2: '2 Player'};
            $scope.boardSizes = {3: '3x3', 4: '4x4', 5: '5x5'};
            $scope.boardSize = 3;
            $scope.gameType = 1;
            $scope.boardName = $scope.boardSizes[$scope.boardSize];
            $scope.gameName = $scope.gameTypes[$scope.gameType];
            $scope.liveGame = false;
            $scope.games = [];

            var currentGame = {};

            $scope.selectGameType = function (gameTypeId) {
                $scope.gameType = gameTypeId;
                $scope.gameName = $scope.gameTypes[$scope.gameType];
                $scope.showGameTypes = false;
            };

            $scope.selectBoardSize = function (boardSizeId) {
                $scope.boardSize = boardSizeId;
                $scope.boardName = $scope.boardSizes[$scope.boardSize];
                $scope.showBoardSizes = false;
            };

            $scope.createGame = function () {
                $scope.makeNewGame = true;
                $scope.liveGame = false;
            };

            $scope.startGame = function () {
                var startTime = new Date().getTime();
                $scope.makeNewGame = false;
                $scope.liveGame = true;
                $scope.$broadcast('new-game');
                currentGame = {'startTime': startTime, 'gameType': $scope.gameType, 'size': $scope.boardSize};
            };

            $scope.endGame = function(game) {
                var final = Object.assign(currentGame, game);
                $scope.games.push(final);
            }

        });

})();
