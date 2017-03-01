angular.module('pokedex-fvoska-infinum').controller('pokemonsCtrl', ['$scope', '$rootScope', 'cfpLoadingBar', 'CONFIG', 'pokemonApi', 'myPokemons', function($scope, $rootScope, cfpLoadingBar, CONFIG, pokemonApi, myPokemons) {
  $scope.Math = window.Math;

  $scope.start = function() {
    cfpLoadingBar.start();
  };

  $scope.complete = function () {
    cfpLoadingBar.complete();
  };

  $scope.pokemons = []; // Array of pokemons.
  var myPokemonsList = false; // Whether we are looking at all the pokemons or only "my pokemons".
  var myPokemonsCount = 0; // Pokemon count.
  if ($scope.myPokemons) {
    myPokemonsList = true;
  }

  $scope.myPokemon = function(id) {
    return myPokemons.hasPokemon(id);
  };

  $scope.addPokemon = function(id) {
    // Delegate addition to service.
    var added = myPokemons.addPokemon(id);

    // Update scope.
    if (myPokemonsList) getMyPokemons();
    else getAllPokemons();
    return added;
  };

  $scope.removePokemon = function(id) {
    // Delegate deletion to service.
    var removed = myPokemons.removePokemon(id);

    // Update scope.
    if (myPokemonsList) getMyPokemons();
    else getAllPokemons();
    return removed;
  };

  // Pagination variables.
  $scope.pagination = {};
  $scope.pagination.pageSize = CONFIG.PAGE_SIZE;
  $scope.pagination.pageNumber = 1;
  $scope.pagination.min = CONFIG.MIN_PAGE;
  $scope.pagination.max = CONFIG.MAX_PAGE;

  // Check if my pokemons for current page are fetched (multiple requests - 1 pokemon = 1 request)
  function myPokemonsDoneCheck(k) {
    var toShow = 4;
    if ($scope.pagination.pageNumber * $scope.pagination.pageSize > myPokemonsCount) {
      toShow = Math.min(myPokemonsCount, $scope.pagination.pageNumber * $scope.pagination.pageSize) % $scope.pagination.pageSize;
    }
    if (k >= toShow) {
      $scope.complete();
      $scope.pagination.disable = false;
    }
  }

  // Check if all pokemons for current page are fetched (multiple requests - 1 pokemon = 1 request)
  function allPokemonsDoneCheck(i) {
    if (i >= $scope.pagination.pageSize) {
      $scope.complete();
      $scope.pagination.disable = false;
    }
  }

  function getMyPokemons() {
    // Disable pagination buttons until we fetch all pokemons.
    $scope.pagination.disable = true;

    // Get my pokemons from local storage.
    var pokes = myPokemons.getPokemons();
    myPokemonsCount = pokes.length;

    // Update pokemon count display.
    $rootScope.myPokemonsCount = myPokemonsCount;

    // Minimum and maximum page number.
    $scope.pagination.min = CONFIG.MIN_PAGE;
    $scope.pagination.max = Math.ceil(pokes.length / $scope.pagination.pageSize);

    // Current page range.
    var min = $scope.pagination.pageSize * ($scope.pagination.pageNumber) - $scope.pagination.pageSize + 1;
    var max = $scope.pagination.pageNumber * $scope.pagination.pageSize;

    // Slice pokemon IDs from local storage to fit page.
    $scope.myPokemons = pokes.slice(min - 1, max);

    // Clear page.
    $scope.pokemons = [];

    // Start loading bar.
    $scope.start();

    // Fetch all pokemons' details.
    var i = 0;
    $scope.myPokemons.forEach(function(pokemon) {
      pokemonApi.getPokemon(pokemon.id, function(pokemonDetails) {
        i++;
        myPokemonsDoneCheck(i);
        if (pokemonDetails) {
          pokemonDetails.myPokemon = true;
          $scope.pokemons.push(pokemonDetails); // Display when we get data.
        }
      });
    });
  }

  function getAllPokemons() {
    // Disable pagination buttons until we fetch all pokemons.
    $scope.pagination.disable = true;

    // Pagination limit.
    $scope.pagination.min = CONFIG.MIN_PAGE;
    $scope.pagination.max = CONFIG.MAX_PAGE;

    // Clear.
    $scope.pokemons = [];

    // Loading...
    $scope.start();

    // Fetch all pokemons for current page.
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
