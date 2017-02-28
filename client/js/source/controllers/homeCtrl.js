angular.module('pokedex-fvoska-infinum').controller('homeCtrl', ['$scope', 'cfpLoadingBar', function($scope, cfpLoadingBar) {
  $scope.start = function() {
    cfpLoadingBar.start();
  };

  $scope.complete = function () {
    cfpLoadingBar.complete();
  };

  $scope.start();

  setTimeout(function() {
    $scope.complete();
  }, 250);
}]);
