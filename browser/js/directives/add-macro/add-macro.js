app.directive('addMacro', function() {
    return {
        restrict: 'E',
        templateUrl: 'browser/js/directives/add-macro/add-macro.html',
        scope: {
            shortcut: "=",
            steps: "=",
        },
        link: function(scope, element, attributes) {
            scope.choicesWithOptions = {click: ['right', 'left'], itunes: ['play', 'stop']};
            scope.actionCategories = ['click', 'enter', 'file', 'itunes', 'keyboard', 'chrome'];

                var count = 0;
                var step = $('.step').clone();
                $('#keyboard-shortcut').on('keydown', function (event) {
                    var numOfPluses;
                    console.log(event.which);
                    if ($(this).val() === '') numOfPluses = 0;
                    else numOfPluses = $(this).val().match(/\+/g) ? $(this).val().match(/\+/g).length : 0;
                    console.log(numOfPluses);
                    if ((numOfPluses === 1) || (numOfPluses === 0)) {
                        if (event.which === 17) $(this).val($(this).val() + 'ctrl+');
                        else if(event.which === 18) $(this).val($(this).val() + 'alt+');
                        else if(event.which === 16) $(this).val($(this).val() + 'shift+');
                        else if(event.which === 8)  $(this).val('');
                        else return false;
                    }
                    else {
                        var arr = $(this).val().split('+');
                        arr.splice(0,2);
                        arr = arr.join('');
                        if(arr.length >= 1 && event.which !== 8) return false;
                    }
                });

            scope.addStep = function() {
                scope.steps.push({name: null, action: null});
            };
            scope.showOptions = function() {
                scope.showChoices = true;
            };
            scope.removeStep = function(index) {
                scope.steps.splice(index, 1);
            }
        }
    }
});