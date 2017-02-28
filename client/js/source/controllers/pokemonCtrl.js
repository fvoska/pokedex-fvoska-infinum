angular.module('pokedex-fvoska-infinum').controller('pokemonCtrl', ['$scope', '$rootScope', '$stateParams', 'cfpLoadingBar', 'CONFIG', 'pokemonApi', 'myPokemons', function($scope, $rootScope, $stateParams, cfpLoadingBar, CONFIG, pokemonApi, myPokemons) {
  $scope.start = function() {
    cfpLoadingBar.start();
  };

  $scope.complete = function () {
    cfpLoadingBar.complete();
  };

  $scope.addPokemon = function(id) {
    var added = myPokemons.addPokemon(id);
    if (added) $scope.myPokemon = true;
    return added;
  };

  $scope.removePokemon = function(id) {
    var removed = myPokemons.removePokemon(id);
    if (removed) $scope.myPokemon = false;
    return removed;
  };

  $scope.start();

  pokemonApi.getPokemon($scope.id, function(pokemonDetails) {
    $scope.requestDone = true;
    if (pokemonDetails) {
      $scope.pokemonDetails = pokemonDetails;
      $rootScope.titleDetail = pokemonDetails.name;
      $scope.myPokemon = myPokemons.hasPokemon(pokemonDetails.id);
      $scope.complete();
    }
  });
}]);
