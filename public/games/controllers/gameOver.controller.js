(function () {
    'use strict';
    angular
        .module('games.controllers')
        .controller('GameOverController', function ($scope, $uibModalInstance, Outcome, Player) {

            $scope.outcome = Outcome;
            $scope.playerNum = Player;

            $scope.rematch = function() {
                $uibModalInstance.close('rematch');
            };

            $scope.replay = function() {
                $uibModalInstance.close('replay');
            };

            $scope.done = function () {
                $uibModalInstance.dismiss();
            };

        })
})();
