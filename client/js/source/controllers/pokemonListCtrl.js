angular.module('pokedex-fvoska-infinum').controller('pokemonListCtrl', ['$scope', '$rootScope', 'myPokemons', function($scope, $rootScope, myPokemons) {
  $scope.localPokemons = myPokemons.getPokemons();
}]);
