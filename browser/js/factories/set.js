app.factory('MacroSetFactory', function() {
    var MacroSet = models.MacroCollection;
    function getMacroSets() {
        return MacroSet.find()
    }
    return {
        getMacroSets: getMacroSets
    }
})