var app = angular.module('pokedex-fvoska-infinum', ['ui.router', 'angular-loading-bar', 'ngAnimate', 'pokedex-fvoska-infinum.config']);

// Animations
app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
}]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'CONFIG', function($stateProvider, $urlRouterProvider, $locationProvider, CONFIG) {
  // Set up states.

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: CONFIG.BASE_URL + 'views/home.html',
      navId: 'home',
      title: 'Home'
    })
    .state('pokemonList', {
      url: '/pokemons',
      templateUrl: CONFIG.BASE_URL + 'views/pokemonList.html',
      navId: 'pokemonList',
      title: 'Pokémons'
    })
    .state('pokemonMyList', {
      url: '/me/pokemons',
      templateUrl: CONFIG.BASE_URL + 'views/pokemonMyList.html',
      navId: 'pokemonMyList',
      title: 'My Pokémons'
    })
    .state('pokemonMyList.details', {
      url: '/:id',
      views: {
        '@': {
          templateUrl: CONFIG.BASE_URL + 'views/pokemonDetail.html'
        }
      },
      navId: 'pokemonMyList',
      title: 'My '
    })
    .state('pokemonList.details', {
      url: '/:id',
      views: {
        '@': {
          templateUrl: CONFIG.BASE_URL + 'views/pokemonDetail.html'
        }
      },
      navId: 'pokemonMyList',
      title: ''
    });

  // Use the HTML5 History API.
  $locationProvider.html5Mode(true);
}]);


app.run(['$rootScope', '$state', 'CONFIG', function($rootScope, $state, CONFIG) {
  // All routes should have access to config.
  $rootScope.CONFIG = CONFIG;

  // Route change start.
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    // Clean route details at route change start.
    $rootScope.titleDetail = '';
    $rootScope.stateName = toState.name;
  });

  // Route changed.
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    // Scroll to top.
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    // Update title.
    $rootScope.title = $state.current.title;

    // Update navbar.
    if ($state.current.redirectTo == '/') {
      $('.navbar').find('.active').removeClass('active');
      $('#home').addClass('active');
    }
    else {
      $('.navbar').find('.active').removeClass('active');
      $('#' + $state.current.navId).addClass('active');
    }
  });
}]);
