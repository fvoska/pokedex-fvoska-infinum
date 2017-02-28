angular.module('pokedex-fvoska-infinum').directive('pokemons', ['CONFIG', function(CONFIG) {
  return {
    restrict: 'E',
    scope: {
      myPokemons: '=pokemons'
    },
    templateUrl: CONFIG.BASE_URL + 'views/pokemons.html'
  };
}]);
