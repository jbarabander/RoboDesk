var Promise = require('bluebird');
function delay(ms, fn) {
    var deferred = Promise.pending();
    setTimeout(function() {
        fn();
        deferred.resolve();
    }, ms);
    return deferred.promise;
}


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
        console.log(step.action);
        if(step.name === 'keyboard') {
            return robot.typeString(step.action);
        }
        else if(step.name === 'keytap') {
            var chainedVal = delay(100, function() {
                robot.keyTap(step.option);
            });
            if(step.action) {
                for(var i = 1; i < step.action; i++) {
                    chainedVal = chainedVal.then(function () {
                        return delay(100, function(){
                            robot.keyTap(step.option);
                        });
                    })
                }
            }
        }
        else if(step.name === 'file') {
            gui.Shell.openItem(step.action);
        }
        else if(step.name === 'browser') {
            setTimeout(function() {
                gui.Shell.openExternal(step.action);
            }, 1000);
        }

    }
    function bindMacro(macroObj) {
        var shortcutSplit = macroObj.shortcut.split('+');
        var keyBinding = shortcutSplit.map(function(element) {
            return element[0].toUpperCase() + element.slice(1);
        }).join('+');
        var option = {
            key: keyBinding,
            active: function() {
                setTimeout(function() {
                    var steps = macroObj.steps;
                    steps.forEach(function(step) {
                        stepEval(step);
                    })
                }, 300)
            },
            failed: function(msg) {
                console.log(msg);
            }
        };
        var shortcut = new gui.Shortcut(option);
        gui.App.registerGlobalHotKey(shortcut);
        //shortcut.on('active', function() {
        //    console.log('this is active');
        //})
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