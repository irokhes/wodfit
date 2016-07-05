var  mongoose = require('mongoose');

var wodSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, enum: ['EMOM', 'AMRAP', 'AFAP','ROUNDS_FOR_TIME', 'ROUNDS_WITH_BREAK', 'LADDER']},
    date: {type : Date, default: Date.now},
    time: {type: String},
    roundsOrTotalReps: {type: Number},
    repsInRounds: {type: Array},
    exercises: {type: Array},
    roundsLadder: {type: Array},
    timeBetweenSeries: {type: Number}
});


var Wod = module.exports = mongoose.model('Wod', wodSchema);