'use strict';

//Barbershops service used to communicate Barbershops REST endpoints
angular.module('barbershops').factory('Barbershops', ['$resource',
	function($resource) {
		return $resource('barbershops/:barbershopId', { barbershopId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);