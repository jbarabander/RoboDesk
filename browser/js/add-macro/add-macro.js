app.config(function($stateProvider) {
    $stateProvider
    .state('addMacro', {
            url: '/macros/add',
            templateUrl: 'browser/js/add-macro/add-macro.html',
            controller: 'AddMacroController',
            resolve: {
                macroSets: function(MacroSetFactory) {
                    return MacroSetFactory.getMacroSets();
                }
            }
        })
});

app.controller('AddMacroController', function($scope, MacroFactory, macroSets, $state) {
    $scope.macroCollections = macroSets;
    $scope.macro = {
        steps: [{name: null}],
        shortcut: null
    }
    $scope.createMacro = function() {
        MacroFactory.createMacro($scope.macro)
        .then(function(element) {
                $state.go('home');
            })
    }
});