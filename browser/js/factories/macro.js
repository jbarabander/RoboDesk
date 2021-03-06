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
            return delay(2000, function() {
                robot.typeString(step.action)
            });
        }
        else if(step.name === 'keytap') {
            var chainedVal = delay(2000, function() {
                robot.keyTap(step.option);
            });
            if(step.action) {
                for(var i = 1; i < step.action; i++) {
                    chainedVal = chainedVal.then(function () {
                        return delay(2000, function(){
                            robot.keyTap(step.option);
                        });
                    })
                }
            }
            return chainedVal;
        }
        else if(step.name === 'file') {
            return delay(2000, function() {
                return gui.Shell.openItem(step.action);
            })
        }
        else if(step.name === 'browser') {
            return delay(2000, function() {
                gui.Shell.openExternal(step.action);
            })
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
                    var chainedStep;
                    var steps = macroObj.steps;
                    steps.forEach(function(step, index) {
                        if(index === 0) chainedStep = stepEval(step);
                        else chainedStep.then(function() {
                            return stepEval(step);
                        })
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