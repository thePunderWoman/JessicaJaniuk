(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

angular.module('Janiuk', ['ui.router', 'Janiuk.controllers', 'Janiuk.services', 'ngMaterial']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    var viewUrl = function viewUrl(relativeUrl) {
        return '/app/views/' + relativeUrl;
    };

    $stateProvider.state('app', {
        url: '/',
        templateUrl: viewUrl("home.html"),
        controller: "HomeCtrl",
        controllerAs: "vm",
        data: { pageTitle: 'Welcome' }
    }).state('about', {
        url: '/about',
        templateUrl: viewUrl("about.html"),
        data: { pageTitle: 'About Me' }
    }).state('connect', {
        url: '/connect',
        templateUrl: viewUrl("connect.html"),
        data: { pageTitle: 'Connect With Me' }
    }).state('photography', {
        url: '/photography',
        templateUrl: viewUrl("photography.html"),
        data: { pageTitle: 'Photography' }
    }).state('r2d2', {
        url: '/r2d2',
        templateUrl: viewUrl("r2d2.html"),
        data: { pageTitle: 'R2-D2' }
    }).state('blog', {
        url: '/blog',
        templateUrl: viewUrl("blog.html"),
        controller: "BlogCtrl",
        controllerAs: "vm",
        data: { pageTitle: 'Blog' }
    });
}]);

angular.module('Janiuk.controllers', []);
angular.module('Janiuk.services', []);

},{}]},{},[1]);