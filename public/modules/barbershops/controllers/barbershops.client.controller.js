'use strict';

// Barbershops controller
angular.module('barbershops').controller('BarbershopsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Barbershops',
	function($scope, $stateParams, $location, Authentication, Barbershops) {
		$scope.authentication = Authentication;

		// Create new Barbershop
		$scope.create = function() {
			// Create new Barbershop object
			var barbershop = new Barbershops ({
				name: this.name,
				owner: this.owner,
				telephone: this.telephone,
				email: this.email,
				webSite: this.webSite
			});

			// Redirect after save
			barbershop.$save(function(response) {
				$location.path('barbershops/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.owner = '';
				$scope.telephone = '';
				$scope.email = '';
				$scope.webSite = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Barbershop
		$scope.remove = function(barbershop) {
			if ( barbershop ) {
				barbershop.$remove();

				for (var i in $scope.barbershops) {
					if ($scope.barbershops [i] === barbershop) {
						$scope.barbershops.splice(i, 1);
					}
				}
			} else {
				$scope.barbershop.$remove(function() {
					$location.path('barbershops');
				});
			}
		};

		// Update existing Barbershop
		$scope.update = function() {
			var barbershop = $scope.barbershop;

			barbershop.$update(function() {
				$location.path('barbershops/' + barbershop._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Barbershops
		$scope.find = function() {
			$scope.barbershops = Barbershops.query();
		};

		// Find existing Barbershop
		$scope.findOne = function() {
			$scope.barbershop = Barbershops.get({
				barbershopId: $stateParams.barbershopId
			});
		};
	}
]);
