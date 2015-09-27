app.config(function($stateProvider) {
    $stateProvider
    .state('mountSet', {
            url: '/macrosets/mount',
            templateUrl: 'browser/js/load-macro-set/load-macro-set.html',
            controller: 'LoadMacroController',
            resolve: {
                macroSets: function(MacroSetFactory) {
                    return MacroSetFactory.getMacroSets();
                }
            }
        })
});

app.controller('LoadMacroController', function($scope, macroSets, MacroFactory) {
    $scope.macroSets = macroSets;
    $scope.macroSetSelection = null;
    $scope.mountMacros = function() {
        return MacroFactory.mountMacros($scope.macroSetSelection);
    }
});