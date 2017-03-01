angular.module('pokedex-fvoska-infinum').factory('myPokemons', [function() {
  // Service for saving pokemons in local storage.
  // Currently only IDs are stored, it can be expanded to store comments/nicknames for specific pokemons.
  var myPokemons = {};

  // Adds pokemon to local storage.
  myPokemons.addPokemon = function(id) {
    var myps = JSON.parse(localStorage.getItem('myPokemons'));
    if (!myps) myps = [];
    var exists = false;
    for (var i = 0; i < myps.length; i++) {
      if (myps[i].id === id) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      myps.push({ "id": id });
      localStorage.setItem('myPokemons', JSON.stringify(myps));
      return true;
    }
    else {
      return false;
    }
  };

  // Adds pokemon from local storage.
  myPokemons.removePokemon = function(id) {
    var myps = JSON.parse(localStorage.getItem('myPokemons'));
    if (!myps) myps = [];
    var index = -1;
    for (var i = 0; i < myps.length; i++) {
      if (myps[i].id === id) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      myps.splice(index, 1);
      localStorage.setItem('myPokemons', JSON.stringify(myps));
      return true;
    }
    else {
      return false;
    }
  };

  // Checks, by ID, if pokemon is in local storage.
  myPokemons.hasPokemon = function(id) {
    var myps = JSON.parse(localStorage.getItem('myPokemons'));
    if (!myps) myps = [];
    var index = -1;
    for (var i = 0; i < myps.length; i++) {
      if (myps[i].id === id) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      return true;
    }
    else {
      return false;
    }
  };

  // Gets all pokemons from local storage.
  myPokemons.getPokemons = function() {
    var myps = JSON.parse(localStorage.getItem('myPokemons'));
    if (!myps) myps = [];
    return myps;
  };

  return myPokemons;
}]);
