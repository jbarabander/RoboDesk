app.factory('MacroFactory', function() {
    var Macro = models.Macro;
    function createMacro(macroObj) {
        return Macro.create(macroObj)
    }
    //function updateMacro(macroObj) {
    //    Macro.findById(macroObj._id)
    //    .then(function(element) {
    //            macroObj
    //        })
    //}
    function bindMacro(macroObj) {
        var shortcutSplit = macroObj.shortcut.split('+');
        var shortcut = shortcutSplit[0] + '+' + shortcutSplit[1].split('').join('+');
        delete macroObj.shortcut;
        var option = {
            key: shortcut,
            active: function() {
                macroObj.steps.forEach(function(element) {
                })
            }
        }
        return option;
    }
    function loadMacros(macroSetId) {
        return Macro.find({macroCollection: macroSetId});
    }
    function mountMacros(macroSetId) {
        loadMacros(macroSetId)
        .then(function(element) {
                console.log(element);
            })
    }
    return {
        createMacro: createMacro,
        mountMacros: mountMacros
    }
})