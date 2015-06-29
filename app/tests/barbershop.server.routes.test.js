'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Barbershop = mongoose.model('Barbershop'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, barbershop;

/**
 * Barbershop routes tests
 */
describe('Barbershop CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Barbershop
		user.save(function() {
			barbershop = {
				name: 'Barbershop Name'
			};

			done();
		});
	});

	it('should be able to save Barbershop instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Barbershop
				agent.post('/barbershops')
					.send(barbershop)
					.expect(200)
					.end(function(barbershopSaveErr, barbershopSaveRes) {
						// Handle Barbershop save error
						if (barbershopSaveErr) done(barbershopSaveErr);

						// Get a list of Barbershops
						agent.get('/barbershops')
							.end(function(barbershopsGetErr, barbershopsGetRes) {
								// Handle Barbershop save error
								if (barbershopsGetErr) done(barbershopsGetErr);

								// Get Barbershops list
								var barbershops = barbershopsGetRes.body;

								// Set assertions
								(barbershops[0].user._id).should.equal(userId);
								(barbershops[0].name).should.match('Barbershop Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Barbershop instance if not logged in', function(done) {
		agent.post('/barbershops')
			.send(barbershop)
			.expect(401)
			.end(function(barbershopSaveErr, barbershopSaveRes) {
				// Call the assertion callback
				done(barbershopSaveErr);
			});
	});

	it('should not be able to save Barbershop instance if no name is provided', function(done) {
		// Invalidate name field
		barbershop.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Barbershop
				agent.post('/barbershops')
					.send(barbershop)
					.expect(400)
					.end(function(barbershopSaveErr, barbershopSaveRes) {
						// Set message assertion
						(barbershopSaveRes.body.message).should.match('Please fill Barbershop name');
						
						// Handle Barbershop save error
						done(barbershopSaveErr);
					});
			});
	});

	it('should be able to update Barbershop instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Barbershop
				agent.post('/barbershops')
					.send(barbershop)
					.expect(200)
					.end(function(barbershopSaveErr, barbershopSaveRes) {
						// Handle Barbershop save error
						if (barbershopSaveErr) done(barbershopSaveErr);

						// Update Barbershop name
						barbershop.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Barbershop
						agent.put('/barbershops/' + barbershopSaveRes.body._id)
							.send(barbershop)
							.expect(200)
							.end(function(barbershopUpdateErr, barbershopUpdateRes) {
								// Handle Barbershop update error
								if (barbershopUpdateErr) done(barbershopUpdateErr);

								// Set assertions
								(barbershopUpdateRes.body._id).should.equal(barbershopSaveRes.body._id);
								(barbershopUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Barbershops if not signed in', function(done) {
		// Create new Barbershop model instance
		var barbershopObj = new Barbershop(barbershop);

		// Save the Barbershop
		barbershopObj.save(function() {
			// Request Barbershops
			request(app).get('/barbershops')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Barbershop if not signed in', function(done) {
		// Create new Barbershop model instance
		var barbershopObj = new Barbershop(barbershop);

		// Save the Barbershop
		barbershopObj.save(function() {
			request(app).get('/barbershops/' + barbershopObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', barbershop.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Barbershop instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Barbershop
				agent.post('/barbershops')
					.send(barbershop)
					.expect(200)
					.end(function(barbershopSaveErr, barbershopSaveRes) {
						// Handle Barbershop save error
						if (barbershopSaveErr) done(barbershopSaveErr);

						// Delete existing Barbershop
						agent.delete('/barbershops/' + barbershopSaveRes.body._id)
							.send(barbershop)
							.expect(200)
							.end(function(barbershopDeleteErr, barbershopDeleteRes) {
								// Handle Barbershop error error
								if (barbershopDeleteErr) done(barbershopDeleteErr);

								// Set assertions
								(barbershopDeleteRes.body._id).should.equal(barbershopSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Barbershop instance if not signed in', function(done) {
		// Set Barbershop user 
		barbershop.user = user;

		// Create new Barbershop model instance
		var barbershopObj = new Barbershop(barbershop);

		// Save the Barbershop
		barbershopObj.save(function() {
			// Try deleting Barbershop
			request(app).delete('/barbershops/' + barbershopObj._id)
			.expect(401)
			.end(function(barbershopDeleteErr, barbershopDeleteRes) {
				// Set message assertion
				(barbershopDeleteRes.body.message).should.match('User is not logged in');

				// Handle Barbershop error error
				done(barbershopDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Barbershop.remove().exec();
		done();
	});
});