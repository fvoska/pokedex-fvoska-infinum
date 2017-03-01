angular.module('pokedex-fvoska-infinum').factory('pokemonApi', ['$http', '$q', 'CONFIG', function($http, $q, CONFIG) {
  // Wrapper for pokeapi.co requests.
  var pokemonApi = {};

  // Gets pokemons from min ID to max ID. Results are returned once all requests complete === slow.
  pokemonApi.getPokemons = function(min, max, callback) {
    var numFetched = 0;
    var pokemons = [];
    function fetch(i) {
      return $http({
        method: "GET",
        cache: true,
        url: CONFIG.API_URL + 'pokemon/' + i + '/'
      }).then(function (response) {
        pokemons.push(response.data);
        numFetched++;
      }, function (response) {
        callback(pokemons);
      });
    }
    var calls = [];
    for (var i = min; i <= max; i++) {
      calls.push(fetch(i));
    }
    $q.all(calls).then(function() {
      callback(pokemons);
    });
  };

  // Get's specific pokemon's details.
  // For fetching mulitple pokemons, this is better option than getPokemons since it returns pokemon's details when they are fetched so fetch information can be displayed immediately.
  pokemonApi.getPokemon = function(id, callback) {
    var pokemonDetails = {};
    pokemonDetails.id = id;
    $http({
      method: "GET",
      cache: true,
      url: CONFIG.API_URL + 'pokemon/' + id + '/'
    }).then(function (response) {
      callback(response.data);
    }, function (response) {
      callback(false);
    });
  };

  return pokemonApi;
}]);
