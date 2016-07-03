var  mongoose = require('mongoose');

var wodSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, enum: ['EMOM', 'AMRAP', 'AFAP','ROUNDS FOR TIME', 'ROUNDS WITH BREAK']},
    date: {type : Date, default: Date.now},
    time: {type: String},
    roundsOrTotalReps: {type: Number},
    repsInRounds: {type: Array},
    exercises: {type: Array},
    ladderRounds: {type: Array},
    timeBetweenSeries: {type: Number}
});


var Wod = module.exports = mongoose.model('Wod', wodSchema);