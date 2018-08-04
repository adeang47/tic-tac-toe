'use strict';


describe('StartGameController', function () {


    var $controller, scope;

    beforeEach(angular.mock.module('games.controllers'));


    beforeEach(inject(function (_$controller_, $rootScope) {
        $controller = _$controller_;
        scope = $rootScope.$new();
    }));

    describe('initial game creation', function () {
        it('expect the initial game shown to the user is a 1 Player 3x3 game', function () {
            var controller = $controller('StartGameController', {$scope: scope});
            expect(scope.boardName).toEqual('3x3');
            expect(scope.gameName).toEqual('1 Player');

        })
    })

});

describe('BoardController', function () {


    var $controller, $rootScope, $compile, $document, $timeout, scope, element, controller;

    beforeEach(angular.mock.module('games.controllers'));


    beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_, _$document_, _$timeout_) {
        $controller = _$controller_;
        $compile = _$compile_;
        $document = _$document_;
        $timeout = _$timeout_;
        $rootScope = _$rootScope_;
    }));

    describe('Single Player', function () {

        beforeEach(function () {
            scope = $rootScope.$new();
            element = $compile('<board size=3, gameType=1></board>')($rootScope);
            $rootScope.$digest();
            scope.size = 3;
            scope.players = 1;
            controller = $controller('BoardController', {
                $scope: scope,
                $element: element,
                $document: $document,
                $timeout: $timeout,
                $uibModal: {}
            });
        });


        it('$scope.createBoard', function () {
            scope.turns = 9;
            scope.size = 3;
            scope.createBoard();
            expect(scope.boardHistory.length).toEqual(1);
        });

        it('$scope.reset', function () {
            scope.turns = 9;
            scope.reset();
            expect(scope.turns).toEqual(0);
        });

        it('$scope.selectTile', function () {
            scope.turns = 0;
            scope.playerTurn = 0;
            scope.createBoard();
            scope.selectTile(0, 0);
            expect(scope.boardArray[0][0]['player']).toEqual(0);
            expect(scope.playerTurn).toEqual(1);
            expect(scope.checkPlayer(0, 0)).toEqual(0);
            expect(scope.turns).toEqual(1);
        });

        it('$scope.redo', function () {
            scope.turns = 0;
            scope.playerTurn = 0;
            scope.createBoard();
            scope.selectTile(0, 0);
            scope.selectTile(0, 1);
            scope.redo();
            expect(scope.boardHistory.length).toEqual(1);
            expect(scope.playerTurn).toEqual(0);
        });

        // reset

        // rematch

    });


    describe('Two Players', function () {

        beforeEach(function () {
            scope = $rootScope.$new();
            element = $compile('<board size=3, gameType=2></board>')($rootScope);
            $rootScope.$digest();
            scope.size = 3;
            scope.players = 2;
            controller = $controller('BoardController', {
                $scope: scope,
                $element: element,
                $document: $document,
                $timeout: $timeout,
                $uibModal: {}
            });
        });

        it('$scope.selectTile', function () {
            scope.turns = 0;
            scope.playerTurn = 0;
            scope.createBoard();
            scope.selectTile(0, 0);
            expect(scope.boardArray[0][0]['player']).toEqual(0);
            expect(scope.playerTurn).toEqual(1);
            expect(scope.checkPlayer(0, 0)).toEqual(0);
            expect(scope.turns).toEqual(1);
        });

        it('$scope.redo', function () {
            scope.turns = 0;
            scope.playerTurn = 0;
            scope.createBoard();
            scope.selectTile(0, 0);
            scope.selectTile(0, 1);
            scope.redo();
            expect(scope.boardHistory.length).toEqual(2);
            expect(scope.playerTurn).toEqual(1);
        });

    });

    // test comp outside


});