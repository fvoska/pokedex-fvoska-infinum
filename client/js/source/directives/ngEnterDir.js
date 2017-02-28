angular.module('pokedex-fvoska-infinum')
.directive('ngEnter', function() {
  // This directives evaluates expression when enter key is pressed on the element.
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if (event.which === 13) {
        scope.$apply(function() {
          scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      }
    });
  };
});
