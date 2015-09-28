'use strict';
window.app = angular.module('RoboDesk', ['ui.router']);

//app.config(function ($urlRouterProvider, $locationProvider) {
//     //This turns off hashbang urls (/#about) and changes it to something normal (/about)
//    //$locationProvider.html5Mode(true);
//     //If we go to a URL that ui-router doesn't have registered, go to the "/" url.
//    //$urlRouterProvider.otherwise('/');
//    //FIXME
//});

app.run(function($state) {
    $state.go('home');
})
