angular.module('pokedex-fvoska-infinum').controller('pokemonCtrl', ['$scope', '$rootScope', '$stateParams', 'cfpLoadingBar', 'CONFIG', 'pokemonApi', function($scope, $rootScope, $stateParams, cfpLoadingBar, CONFIG, pokemonApi) {
  $scope.start = function() {
    cfpLoadingBar.start();
  };

  $scope.complete = function () {
    cfpLoadingBar.complete();
  };

  $scope.start();

  pokemonApi.getPokemon($scope.id, function(pokemonDetails) {
    if (pokemonDetails) {
      $scope.pokemonDetails = pokemonDetails;
      $rootScope.titleDetail = pokemonDetails.name;
      $scope.complete();
    }
  });
}]);
