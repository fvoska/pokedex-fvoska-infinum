angular.module('pokedex-fvoska-infinum').controller('pokemonsCtrl', ['$scope', '$rootScope', 'cfpLoadingBar', 'CONFIG', 'pokemonApi', function($scope, $rootScope, cfpLoadingBar, CONFIG, pokemonApi) {
  $scope.start = function() {
    cfpLoadingBar.start();
  };

  $scope.complete = function () {
    cfpLoadingBar.complete();
  };

  $scope.pokemons = [];
  var myPokemons = false;
  var myPokemonsCount = 0;
  if (Array.isArray($scope.myPokemons)) {
    myPokemonsCount = $scope.myPokemons.length;
    myPokemons = true;
  }

  function myPokemonsDoneCheck(i) {
    if (i >= myPokemonsCount) {
      $scope.complete();
    }
  }

  if (myPokemons) {
    $scope.start();
    var i = 0;
    $scope.myPokemons.forEach(function(pokemon) {
      i++;
      myPokemonsDoneCheck(i);
      pokemonApi.getPokemon(pokemon.id, function(pokemonDetails) {
        if (pokemonDetails) {
          pokemonDetails.myPokemon = true;
          $scope.pokemons.push(pokemonDetails);
        }
      });
    });
    // Get my pokemons.
  }
  else {
    // Get all pokemons.
  }
}]);
