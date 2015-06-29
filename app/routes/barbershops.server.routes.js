'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var barbershops = require('../../app/controllers/barbershops.server.controller');

	// Barbershops Routes
	app.route('/barbershops')
		.get(barbershops.list)
		.post(users.requiresLogin, barbershops.create);

	app.route('/barbershops/:barbershopId')
		.get(barbershops.read)
		.put(users.requiresLogin, barbershops.hasAuthorization, barbershops.update)
		.delete(users.requiresLogin, barbershops.hasAuthorization, barbershops.delete);

	// Finish by binding the Barbershop middleware
	app.param('barbershopId', barbershops.barbershopByID);
};
