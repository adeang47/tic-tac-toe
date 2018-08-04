// for future use with mongodb

var mongoose = require('mongoose');

module.exports = mongoose.model('Game', {
    startTime: Number,
    endTime: Number,
    size: Number,
    gameType: Number,
    outcome: String,
    winner: Number,
    turns: Number,
    boardHistory: [Map]
});