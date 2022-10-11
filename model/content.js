const mongoose = require('mongoose');

const Content = new mongoose.Schema({
    title:{type:String, required:true},
    body:{type:String, required:true},
});

module.exports = mongoose.model('content-data', Content);