angular.module('pokedex-fvoska-infinum').controller('pokemonDetailCtrl', ['$scope', '$rootScope', '$stateParams', 'CONFIG', 'pokemonApi', function($scope, $rootScope, $stateParams, CONFIG, pokemonApi) {
  // Get pokemon's ID from state parameters.
  $rootScope.titleDetail = $stateParams.id;
  $scope.id = $stateParams.id;
}]);
