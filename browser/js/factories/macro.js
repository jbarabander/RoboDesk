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
    function stepEval(step) {
        console.log('in step eval');
        if(step.name === 'keyboard') robot.typeString(step.action);
    }
    function bindMacro(macroObj) {
        var shortcutSplit = macroObj.shortcut.split('+');
        var keyBinding = shortcutSplit.map(function(element) {
            return element[0].toUpperCase() + element.slice(1);
        }).join('+');
        console.log(keyBinding);
        var option = {
            key: keyBinding,
            active: function() {
                console.log('in the active');
                var steps = macroObj.steps;
                steps.forEach(function(step) {
                    console.log('hi');
                    stepEval(step);
                })
            },
            failed: function(msg) {
                console.log(msg);
            }
        };
        var shortcut = new gui.Shortcut(option);
        console.log(shortcut);
        gui.App.registerGlobalHotKey(shortcut);
        shortcut.on('active', function() {
            console.log('this is is active');
        })
    }
    function loadMacros(macroSetId) {
        return Macro.find({macroCollection: macroSetId});
    }
    function mountMacros(macroSetId) {
        loadMacros(macroSetId)
        .then(function(elements) {
                elements.forEach(function(element) {
                    bindMacro(element);
                });
            })
    }
    return {
        createMacro: createMacro,
        mountMacros: mountMacros
    }
})