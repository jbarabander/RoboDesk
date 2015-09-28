var models = require('./db/index.js');
var Macro = models.Macro;
var MacroCollection = models.MacroCollection;
var Promise = require('bluebird');
var macroCollections = [
    {name: 'testMacro', description: 'our first test Macro'},
    {name: 'testMacro2', description: 'our next test Macro'},
    {name: 'gamingMacro', description: 'our test gaming Macro'}
];

Promise.map(macroCollections, function(element) {
    MacroCollection.create(element);
}).then(function(arr){
    console.log('finished seeding');
})
