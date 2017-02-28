angular.module('pokedex-fvoska-infinum').factory('pokemonApi', ['$http', 'CONFIG', function($http, CONFIG) {
  var pokemonApi = {};

  pokemonApi.getPokemon = function(id, callback) {
    var pokemonDetails = {};
    pokemonDetails.id = id;
    $http({
      method: "GET",
      cache: true,
      url: CONFIG.API_URL + 'pokemon/' + id
    }).then(function mySucces(response) {
      callback(response.data);
    }, function myError(response) {
      callback(false);
    });
  };

  return pokemonApi;
}]);
