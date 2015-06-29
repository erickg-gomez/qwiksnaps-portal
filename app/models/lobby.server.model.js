'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Lobby Schema
 */
var LobbySchema = new Schema({
	// Lobby model fields
	// ...
	day: {
		type: String,
		required: 'Please choose a day',
		trim: true,
		enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	},
	isClosed: {
		type: Boolean,
		default: false,
	},
	openTime: {
		type: String,
		default: '08:00 AM'
	},
	closeTime: {
		type: String,
		default: '08:00 PM'
	}
});

mongoose.model('Lobby', LobbySchema);
