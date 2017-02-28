angular.module('pokedex-fvoska-infinum').controller('pokemonMyListCtrl', ['$scope', '$rootScope', 'myPokemons', function($scope, $rootScope, myPokemons) {
  $scope.localPokemons = myPokemons.getPokemons();
}]);
