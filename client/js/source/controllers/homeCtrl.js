angular.module('pokedex-fvoska-infinum').controller('homeCtrl', ['$scope', '$rootScope', 'cfpLoadingBar', 'CONFIG', function($scope, $rootScope, cfpLoadingBar, CONFIG) {
  $scope.start = function() {
    cfpLoadingBar.start();
  };

  $scope.complete = function () {
    cfpLoadingBar.complete();
  };

  $scope.start();

  setTimeout(function() {
    $scope.complete();
  }, CONFIG.DELAY);
}]);
