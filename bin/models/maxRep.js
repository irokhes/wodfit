var mongoose = require('mongoose');

var maxRepSchema = new mongoose.Schema({
   name: {type: String},
   pbs: [
       {
           weight: {type: Number},
           date: {type: Date}
       }]
});

var MaxRep = module.exports = mongoose.model('MaxRep', maxRepSchema);