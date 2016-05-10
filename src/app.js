'use strict'

angular.module('Janiuk', [
	'ui.router'
]).config(['$stateProvider', '$urlRouterProvider',  ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
	var viewUrl = (relativeUrl) => {
		return `/app/views/${relativeUrl}`;
	}
    $stateProvider
        .state('app', {
            url: '/',
            templateUrl: viewUrl("Home.html")
        });
}]);

angular.module('Janiuk.controllers',[]);
angular.module('Janiuk.services',[]);