var  mongoose = require('mongoose');

var wodSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, enum: ['EMOM', 'AMRAP','ROUNDS_FOR_TIME']},
    date: {type : Date, default: Date.now},
    time: {type: Number},
    exercises: {type: Array}
});


var Wod = module.exports = mongoose.model('Wod', wodSchema);