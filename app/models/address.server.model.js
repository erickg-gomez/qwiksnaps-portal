'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Address Schema
 */
var AddressSchema = new Schema({
	// Address model fields
	// ...
	addressLine1: {
		type: String,
		required: "Please fill Address Line 1",
		trim: true
	},
	addressLine2:{
		type: String,
		default: '',
		trim: true
	},
	city:{
		type: String,
		default: '',
		requierd: 'Please fill city',
		trim: true
	},
	state: {
		type: String,
		default: '',
		requierd: 'Please fill state',
		trim: true
	},
	zipCode:{
		type: String,
		default: '',
		requierd: 'Please fill zip code',
		trim: true
	},
	country:{

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

mongoose.model('Address', AddressSchema);
