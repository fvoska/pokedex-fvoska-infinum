angular.module('pokedex-fvoska-infinum').factory('myPokemons', [function() {
  var myPokemons = {};

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

  myPokemons.getPokemons = function() {
    return JSON.parse(localStorage.getItem('myPokemons'));
  };

  return myPokemons;
}]);
