'use strict';

//Setting up route
angular.module('barbershops').config(['$stateProvider',
	function($stateProvider) {
		// Barbershops state routing
		$stateProvider.
		state('app.listBarbershops', {
			url: '/barbershops',
			templateUrl: 'modules/barbershops/views/list-barbershops.client.view.html'
		}).
		state('app.createBarbershop', {
			url: '/barbershops/create',
			templateUrl: 'modules/barbershops/views/create-barbershop.client.view.html'
		}).
		state('app.viewBarbershop', {
			url: '/barbershops/:barbershopId',
			templateUrl: 'modules/barbershops/views/view-barbershop.client.view.html',
			controller: 'BarbershopsController'
		}).
		state('app.editBarbershop', {
			url: '/barbershops/:barbershopId/edit',
			templateUrl: 'modules/barbershops/views/edit-barbershop.client.view.html'
		});
	}
]);
