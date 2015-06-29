'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Barbershop = mongoose.model('Barbershop'),
	_ = require('lodash');

/**
 * Create a Barbershop
 */
exports.create = function(req, res) {
	var barbershop = new Barbershop(req.body);
	barbershop.user = req.user;

	barbershop.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(barbershop);
		}
	});
};

/**
 * Show the current Barbershop
 */
exports.read = function(req, res) {
	res.jsonp(req.barbershop);
};

/**
 * Update a Barbershop
 */
exports.update = function(req, res) {
	var barbershop = req.barbershop ;

	barbershop = _.extend(barbershop , req.body);

	barbershop.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(barbershop);
		}
	});
};

/**
 * Delete an Barbershop
 */
exports.delete = function(req, res) {
	var barbershop = req.barbershop ;

	barbershop.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(barbershop);
		}
	});
};

/**
 * List of Barbershops
 */
exports.list = function(req, res) { 
	Barbershop.find().sort('-created').populate('user', 'displayName').exec(function(err, barbershops) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(barbershops);
		}
	});
};

/**
 * Barbershop middleware
 */
exports.barbershopByID = function(req, res, next, id) { 
	Barbershop.findById(id).populate('user', 'displayName').exec(function(err, barbershop) {
		if (err) return next(err);
		if (! barbershop) return next(new Error('Failed to load Barbershop ' + id));
		req.barbershop = barbershop ;
		next();
	});
};

/**
 * Barbershop authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.barbershop.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
