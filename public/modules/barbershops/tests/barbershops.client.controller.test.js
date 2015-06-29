'use strict';

(function() {
	// Barbershops Controller Spec
	describe('Barbershops Controller Tests', function() {
		// Initialize global variables
		var BarbershopsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Barbershops controller.
			BarbershopsController = $controller('BarbershopsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Barbershop object fetched from XHR', inject(function(Barbershops) {
			// Create sample Barbershop using the Barbershops service
			var sampleBarbershop = new Barbershops({
				name: 'New Barbershop'
			});

			// Create a sample Barbershops array that includes the new Barbershop
			var sampleBarbershops = [sampleBarbershop];

			// Set GET response
			$httpBackend.expectGET('barbershops').respond(sampleBarbershops);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.barbershops).toEqualData(sampleBarbershops);
		}));

		it('$scope.findOne() should create an array with one Barbershop object fetched from XHR using a barbershopId URL parameter', inject(function(Barbershops) {
			// Define a sample Barbershop object
			var sampleBarbershop = new Barbershops({
				name: 'New Barbershop'
			});

			// Set the URL parameter
			$stateParams.barbershopId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/barbershops\/([0-9a-fA-F]{24})$/).respond(sampleBarbershop);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.barbershop).toEqualData(sampleBarbershop);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Barbershops) {
			// Create a sample Barbershop object
			var sampleBarbershopPostData = new Barbershops({
				name: 'New Barbershop'
			});

			// Create a sample Barbershop response
			var sampleBarbershopResponse = new Barbershops({
				_id: '525cf20451979dea2c000001',
				name: 'New Barbershop'
			});

			// Fixture mock form input values
			scope.name = 'New Barbershop';

			// Set POST response
			$httpBackend.expectPOST('barbershops', sampleBarbershopPostData).respond(sampleBarbershopResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Barbershop was created
			expect($location.path()).toBe('/barbershops/' + sampleBarbershopResponse._id);
		}));

		it('$scope.update() should update a valid Barbershop', inject(function(Barbershops) {
			// Define a sample Barbershop put data
			var sampleBarbershopPutData = new Barbershops({
				_id: '525cf20451979dea2c000001',
				name: 'New Barbershop'
			});

			// Mock Barbershop in scope
			scope.barbershop = sampleBarbershopPutData;

			// Set PUT response
			$httpBackend.expectPUT(/barbershops\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/barbershops/' + sampleBarbershopPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid barbershopId and remove the Barbershop from the scope', inject(function(Barbershops) {
			// Create new Barbershop object
			var sampleBarbershop = new Barbershops({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Barbershops array and include the Barbershop
			scope.barbershops = [sampleBarbershop];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/barbershops\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBarbershop);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.barbershops.length).toBe(0);
		}));
	});
}());