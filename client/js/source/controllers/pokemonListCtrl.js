angular.module('pokedex-fvoska-infinum').controller('pokemonListCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
  // Search handler.
  $scope.search = function(searchValue) {
    $state.go('pokemonList.details', { id: searchValue });
  };
}]);
