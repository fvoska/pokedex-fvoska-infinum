angular.module('pokedex-fvoska-infinum').controller('pokemonsCtrl', ['$scope', '$rootScope', 'cfpLoadingBar', 'CONFIG', 'pokemonApi', 'myPokemons', function($scope, $rootScope, cfpLoadingBar, CONFIG, pokemonApi, myPokemons) {
  $scope.Math = window.Math;

  $scope.start = function() {
    cfpLoadingBar.start();
  };

  $scope.complete = function () {
    cfpLoadingBar.complete();
  };

  $scope.pokemons = [];
  var myPokemonsList = false;
  var myPokemonsCount = 0;
  if ($scope.myPokemons) {
    myPokemonsList = true;
  }

  $scope.myPokemon = function(id) {
    return myPokemons.hasPokemon(id);
  };

  $scope.addPokemon = function(id) {
    var added = myPokemons.addPokemon(id);
    if (myPokemonsList) getMyPokemons();
    else getAllPokemons();
    return added;
  };

  $scope.removePokemon = function(id) {
    var removed = myPokemons.removePokemon(id);
    if (myPokemonsList) getMyPokemons();
    else getAllPokemons();
    return removed;
  };

  $scope.pagination = {};
  $scope.pagination.pageSize = CONFIG.PAGE_SIZE;
  $scope.pagination.pageNumber = 1;
  $scope.pagination.min = CONFIG.MIN_PAGE;
  $scope.pagination.max = CONFIG.MAX_PAGE;

  function myPokemonsDoneCheck(i) {
    if (i >= Math.min(myPokemonsCount, $scope.pagination.pageSize)) {
      $scope.complete();
    }
  }

  function allPokemonsDoneCheck(i) {
    if (i >= $scope.pagination.pageSize) {
      $scope.complete();
    }
  }

  function getMyPokemons() {
    var pokes = myPokemons.getPokemons();
    myPokemonsCount = pokes.length;
    $rootScope.myPokemonsCount = myPokemonsCount;
    $scope.pagination.min = CONFIG.MIN_PAGE;
    $scope.pagination.max = Math.ceil(pokes.length / $scope.pagination.pageSize);
    var min = $scope.pagination.pageSize * ($scope.pagination.pageNumber) - $scope.pagination.pageSize + 1;
    var max = $scope.pagination.pageNumber * $scope.pagination.pageSize;
    $scope.myPokemons = pokes.slice(min - 1, max);
    $scope.pokemons = [];
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
  }

  function getAllPokemons() {
    $scope.pagination.min = CONFIG.MIN_PAGE;
    $scope.pagination.max = CONFIG.MAX_PAGE;
    $scope.pokemons = [];
    $scope.start();
    var j = 0;
    function fetch(i) {
      pokemonApi.getPokemon(i, function(pokemonDetails) {
        j++;
        allPokemonsDoneCheck(j);
        if (pokemonDetails) {
          pokemonDetails.myPokemon = myPokemons.hasPokemon(pokemonDetails.id);
          $scope.pokemons.push(pokemonDetails);
        }
      });
    }
    var min = $scope.pagination.pageSize * ($scope.pagination.pageNumber) - $scope.pagination.pageSize + 1;
    var max = $scope.pagination.pageNumber * $scope.pagination.pageSize;
    for (var i = min; i <= max; i++) {
      fetch(i);
    }
  }

  function page() {
    if (myPokemonsList) {
      // Get my pokemons.
      getMyPokemons();
    }
    else {
      // Get all pokemons.
      getAllPokemons();
    }
  }

  $scope.page = page;

  page();
}]);
