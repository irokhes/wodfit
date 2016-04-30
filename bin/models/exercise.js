var  mongoose = require('mongoose');

var exerciseSchema = new mongoose.Schema({
    name: {type: String, required: true},
});


var Exsercise = module.exports = mongoose.model('Exercise', exerciseSchema);