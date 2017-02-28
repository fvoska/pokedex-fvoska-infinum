angular.module('pokedex-fvoska-infinum').directive('pokemon', ['CONFIG', function(CONFIG) {
  return {
    restrict: 'E',
    scope: {
      id: '=id'
    },
    templateUrl: CONFIG.BASE_URL + 'views/pokemon.html'
  };
}]);
