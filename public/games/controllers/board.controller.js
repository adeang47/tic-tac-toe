(function () {
    'use strict';
    angular
        .module('games.controllers')
        .controller('BoardController', function ($scope, $document, $element, $timeout, $uibModal) {

            $scope.boardArray = [];
            $scope.boardHistory = [];
            $scope.playerTurn = 0;
            $scope.gameOver = false;
            $scope.isReplay = false;
            $scope.isCompTurn = false;
            $scope.turns = 0;


            function changeTurn() {
                if ($scope.playerTurn == 0) {
                    $scope.playerTurn = 1;
                } else if ($scope.playerTurn == 1) {
                    $scope.playerTurn = 0;
                }

                // 0 players - each player is the comp, 1 player - assume player 0 is user
                if ($scope.players == 0 || ($scope.players == 1 && $scope.playerTurn != 0)) {
                    computerTurn();
                } else {
                    $scope.isCompTurn = false;
                }
            }

            // currently a random guess, can add skill later
            function computerTurn() {
                $scope.isCompTurn = true;
                var increment = $scope.size - 1;
                var row = Math.round(Math.random() * increment);
                var col = Math.round(Math.random() * increment);
                var count = 0;
                var limit = 100000;
                while ($scope.boardArray[row][col]['player'] != -1 && count < limit) {
                    row = Math.round(Math.random() * increment);
                    col = Math.round(Math.random() * increment);
                    count += 1;
                }
                $timeout(function () {
                    $scope.selectTile(row, col);
                }, 1500);
            }

            function checkWin(player) {
                // row/column wins
                var won = false;
                for (var i = 0; i < $scope.boardArray.length; i++) {
                    var rowWin = true;
                    var colWin = true;
                    if (!won) {
                        for (var x = 0; x < $scope.boardArray.length; x++) {
                            if ($scope.boardArray[i][x]['player'] != player) rowWin = false;
                            if ($scope.boardArray[x][i]['player'] != player) colWin = false;
                        }
                        if (rowWin || colWin) won = true;
                    }
                }
                // diagonal wins
                if (!won) {
                    var diagWin = true;
                    var orthWin = true;
                    for (var i = 0; i < $scope.boardArray.length; i++) {
                        var opp = $scope.boardArray.length - 1 - i;
                        if ($scope.boardArray[i][i]['player'] != player) orthWin = false;
                        if ($scope.boardArray[opp][i]['player'] != player) diagWin = false;
                    }
                    if (diagWin || orthWin) won = true;
                }

                return won;
            }

            // check if there are no open tiles
            function checkFullBoard() {
                var turnLimit = $scope.size * $scope.size;
                if ($scope.turns >= turnLimit) {
                    return true;
                } else {
                    return false;
                }
            }

            function gameOver(outcome, player) {
                var endTime = new Date().getTime();
                var boardHistory = angular.copy($scope.boardHistory);
                var game = {
                    'endTime': endTime,
                    'outcome': outcome,
                    'winner': player,
                    'boardHistory': boardHistory
                };
                $scope.endGame({'game': game});
                $scope.gameOver = true;
                var parentElem = angular.element($document[0].querySelector('body'));
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    size: "medium",
                    controller: 'GameOverController',
                    templateUrl: 'templates/games/gameOver.html',
                    appendTo: parentElem,
                    resolve: {
                        Outcome: function () {
                            return outcome;
                        },
                        Player: function () {
                            return player;
                        }
                    }
                });

                modalInstance.result.then(function (action) {
                    if (action) {
                        if (action == 'rematch') {
                            $scope.rematch();
                        } else if (action == 'replay') {
                            $scope.replayMatch();
                        }
                    }
                }, function () {
                    console.log('closed')
                });
            }

            function addBoardHistory() {
                var playerTurn = $scope.playerTurn;
                var board = angular.copy($scope.boardArray);
                var newHistory = {'playerTurn': playerTurn, 'board': board};
                $scope.boardHistory.push(newHistory);
            }

            function clearBoard() {
                for (var i = 0; i < $scope.size; i++) {
                    $scope.boardArray[i] = [];
                    for (var x = 0; x < $scope.size; x++) {
                        $scope.boardArray[i].push({'player': -1});
                    }
                }
            }

            // recrusive look through board history to allow for timing delay
            function recurReplayMatch(i) {
                $timeout(function () {
                    if (i < $scope.boardHistory.length) {
                        var history = $scope.boardHistory[i];
                        $scope.playerTurn = history.playerTurn;
                        $scope.boardArray = Object.assign({}, history.board);
                        i += 1;
                        recurReplayMatch(i);
                    } else {
                        $scope.isReplay = false;
                    }
                }, 1000);
            }

            $scope.createBoard = function () {
                $scope.boardArray = [];
                $scope.boardHistory = [];
                $scope.turns = 0;
                $scope.gameOver = false;
                clearBoard();
                addBoardHistory();
            };

            $scope.replayMatch = function () {
                $scope.isReplay = true;
                recurReplayMatch(0);
            };

            $scope.selectTile = function (row, col) {
                if ($scope.boardArray[row][col]['player'] == -1) {
                    $scope.boardArray[row][col]['player'] = $scope.playerTurn;
                    addBoardHistory();
                    $scope.turns += 1;
                    var won = checkWin($scope.playerTurn);
                    if (won) {
                        gameOver('win', $scope.playerTurn);
                    } else if (checkFullBoard()) {
                        gameOver('draw')
                    }
                    else {
                        changeTurn();
                    }
                } else {
                    console.log('tile already taken');
                }
            };

            $scope.checkPlayer = function (row, col) {
                return $scope.boardArray[row][col]['player'];
            };

            $scope.redo = function () {
                if ($scope.turns > 0) {
                    if ($scope.players == 1) {
                        if ($scope.playerTurn == 0) {
                            $scope.boardHistory.splice($scope.turns - 1, 2);
                            $scope.turns -= 2;
                        } else {
                            return
                        }
                    } else {
                        $scope.boardHistory.splice($scope.turns, 1);
                        $scope.turns -= 1;

                    }
                    var idx = $scope.boardHistory.length - 1;
                    var history = Object.assign({}, $scope.boardHistory[idx]);
                    $scope.boardArray = history['board'];
                    $scope.playerTurn = history['playerTurn'];
                    if (idx > 0) changeTurn();
                }
            };

            $scope.reset = function () {
                $scope.createBoard();
                if ($scope.players == 0) computerTurn(); // trigger computer to start match
            };

            $scope.rematch = function () {
                $scope.createBoard();
                changeTurn();
            };

            $scope.$watch('size', function () {
                $scope.createBoard();
            });

            $scope.$on('new-game', function () {
                $scope.createBoard();
                if ($scope.players == 0) computerTurn(); // trigger computer to start match
            });

            $scope.$on('$destroy', function () {
                $element.empty();
            });

        });

})();
