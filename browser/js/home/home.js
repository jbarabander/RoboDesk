app.config(function($stateProvider) {
    $stateProvider
    .state('home', {
            url: '/',
            templateUrl: 'browser/js/home/home.html',
            controller: 'HomeController'

        })
})

app.controller('HomeController', function($scope) {

})