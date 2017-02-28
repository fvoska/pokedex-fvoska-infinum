angular.module('pokedex-fvoska-infinum').controller('pokemonDetailCtrl', ['$scope', '$rootScope', '$stateParams', 'CONFIG', 'pokemonApi', function($scope, $rootScope, $stateParams, CONFIG, pokemonApi) {
  $rootScope.titleDetail = $stateParams.id;
  $scope.id = $stateParams.id;
}]);
