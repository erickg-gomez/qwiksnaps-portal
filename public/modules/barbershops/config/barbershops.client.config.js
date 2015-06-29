'use strict';

// Configuring the Articles module
angular.module('barbershops').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Barbershops', 'barbershops', 'dropdown', '/barbershops(/create)?');
		Menus.addSubMenuItem('sidebar', 'barbershops', 'List Barbershops', 'barbershops');
		Menus.addSubMenuItem('sidebar', 'barbershops', 'New Barbershop', 'barbershops/create');
	}
]);