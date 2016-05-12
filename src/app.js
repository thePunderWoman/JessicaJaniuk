'use strict'

angular.module('Janiuk', [
	'ui.router',
	'Janiuk.controllers',
	'Janiuk.services',
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
            data : { pageTitle: 'About Me' }
        })
        .state('connect', {
        	url: '/connect',
        	templateUrl: viewUrl("connect.html"),
            data : { pageTitle: 'Connect With Me' }
        })
        .state('photography', {
        	url: '/photography',
        	templateUrl: viewUrl("photography.html"),
            data : { pageTitle: 'Photography' }
        })
        .state('r2d2', {
        	url: '/r2d2',
        	templateUrl: viewUrl("r2d2.html"),
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