app.config(function($stateProvider) {
    $stateProvider
    .state('addMacro', {
            url: '/macros/add',
            templateUrl: 'browser/js/add-macro/add-macro.html',
            controller: 'AddMacroController',
            resolve: {
                macroCollections: function() {

                }
            }
        })
});

app.controller('AddMacroController', function($scope) {
    $scope.steps = [{name: null, option: null, action: null}];
    $scope.createMacro = function() {
    }
});