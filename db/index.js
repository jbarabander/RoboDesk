var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/macros");
var db = mongoose.connection;
var ObjectId = mongoose.Schema.Types.ObjectId;
db.on('err', console.error.bind(console, 'mongodb connection error:'));

var macroSchema = mongoose.Schema({
    type: {type: String, required: true},
    shortcut: {type: String, required: true},
    steps: [{
        name: {type: String},
        option: {type: String},
        action: {type: String}
    }],
    macroCollection: {type: ObjectId, ref: 'MacroCollection'}
});

var macroCollectionSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true}
});

module.exports = {
    Macro: mongoose.model('Macro', macroSchema),
    MacroCollection: mongoose.model('MacroCollection', macroCollectionSchema)
};