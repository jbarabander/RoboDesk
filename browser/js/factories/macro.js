app.factory('MacroFactory', function() {
    var Macro = models.Macro;
    function createMacro(macroObj) {
        Macro.create(macroObj)
        .then(function(element) {
                $state.go('view-macro', {id: element._id});
            })
    }
    //function updateMacro(macroObj) {
    //    Macro.findById(macroObj._id)
    //    .then(function(element) {
    //            macroObj
    //        })
    //}
    return {
        createMacro: createMacro
    }
})