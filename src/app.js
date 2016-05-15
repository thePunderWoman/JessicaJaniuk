'use strict'

angular.module('Janiuk', [
    'ui.router',
	'ngSanitize',
    'ngAnimate',
	'Janiuk.controllers',
	'Janiuk.services',
    'ngMaterial',
    'firebase'
]).config(['$stateProvider', '$urlRouterProvider',  ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');

	var viewUrl = (relativeUrl) => {
		return `/app/views/${relativeUrl}`;
	}
    
    $stateProvider
        .state('app', {
            url: '/',
            templateUrl: viewUrl("home.html"),
            controller: "HomeCtrl",
            controllerAs: "vm",
            data : { pageTitle: 'Welcome' }
        })
        .state('about', {
        	url: '/about',
        	templateUrl: viewUrl("about.html"),
            controller: "AboutCtrl",
            controllerAs: "vm",
            data : { pageTitle: 'About Me' }
        })
        .state('connect', {
        	url: '/connect',
        	templateUrl: viewUrl("connect.html"),
            controller: "ConnectCtrl",
            controllerAs: "vm",
            data : { pageTitle: 'Connect With Me' }
        })
        .state('photography', {
        	url: '/photography',
        	templateUrl: viewUrl("photography.html"),
            controller: "PhotoCtrl",
            controllerAs: "vm",
            data : { pageTitle: 'Photography' }
        })
        .state('r2d2', {
        	url: '/r2d2',
        	templateUrl: viewUrl("r2d2.html"),
            controller: "R2D2Ctrl",
            controllerAs: "vm",
            data : { pageTitle: 'R2-D2' }
        })
        .state('blog', {
        	url: '/blog',
        	templateUrl: viewUrl("blog.html"),
        	controller: "BlogCtrl",
        	controllerAs: "vm",
            data : { pageTitle: 'Blog' }
        });
}]);

angular.module('Janiuk.controllers',[]);
angular.module('Janiuk.services',[]);