'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	addressSchema = require('./address.server.model'),
	rateSchema = require('./rate.server.model'),
	lobbySchema = require('./lobby.server.model');

/**
 * Barbershop Schema
 */
var BarbershopSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Barbershop name',
		maxlength: 50,
		trim: true
	},
	owner: {
		type: String,
		default: '',
		trim: true
	},
	adress: addressSchema,
	telephone: {
		type: String,
		default: '',
		trim: true
	},
	email: {
		type: String,
		default: '',
		trim: true,
		lowercase: true
	},
	webSite: {
		type: String,
		default: '',
		trim: true,
		lowercase: true
	},
	rates: [rateSchema],
	lobby: [lobbySchema],
	amenities: [String],
	specialities: [String],
	tags: {
		type: [String]
	},
	categories: {
		type: [String]
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Barbershop', BarbershopSchema);
