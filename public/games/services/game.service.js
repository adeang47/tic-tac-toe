(function () {
    'use strict';
    angular
        .module('games.services')
        .factory('Game', function ($http) {

            // for future use with mongodb

            return {
                get: function (params) {
                    return $http.get('/api/games', {
                        params: params
                    });
                },

                create: function (params) {
                    return $http.post('/api/games', params);
                },

                update: function (gameId, params) {
                    return $http.put('/api/games', {
                        'id': gameId,
                        'params': params
                    });
                }

            }

        })
})();
