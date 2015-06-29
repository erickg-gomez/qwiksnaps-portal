'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Rate Schema
 */
var RateSchema = new Schema({
	// Rate model fields
	// ...
	name:{
		type: String,
		default: '',
		required: 'Please fill name',
		trim: true
	},
	price:{
		type: Number,
		default: 1,
		required: 'Please fill price',
		min: 0
	}
});

mongoose.model('Rate', RateSchema);
