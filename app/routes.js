var Game = require('./models/gameModels');

// for future use with mongodb
module.exports = function (app) {

    app.get('/api/games', function (req, res) {
        Game.find(function (err, games) {

            if (err) res.send(err);

            res.json(games);

        })
    });

    app.post('/api/games', function (req, res) {
        Game.create({
            startTime: req.body.startTime,
            size: req.body.size,
            gameType: req.body.gameType
        }, function(err, game) {
            console.log('created');
            console.log(game);
            if (err) res.send(err);

            res.json(game);
        })
    });

    app.put('/api/games', function(req, res) {
        Game.find({'_id': req.body.gameId}, function(err, games) {
            if (err) res.send(err);

            var game = games[0];
            game.endTime = req.body.params['endTime'];
            game.outcome = req.body.params['outcome'];
            game.winner = req.body.params['winner'];
            game.boardHistory = req.body.params['boardHistory'];
            game.turns = req.body.params['turns'];
            game.save();

            res.json(game);
        })
    });

    app.get('*', function (req, res) {
        res.sendfile('./public/templates/app/index.html');
    });

};
