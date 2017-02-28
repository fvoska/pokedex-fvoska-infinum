module.exports = function(grunt) {
  // Bower directory for JS libs.
  var bowerDir = 'client/bower_components/';

  // App source JS files.
  var scriptsDir = 'client/js/source/';
  var scriptsSafeDestDir = 'client/js/min-safe/';
  grunt.option('scriptsSafeDestDir', 'client/js/min-safe/');
  grunt.option('scriptsDestDir', 'client/js/');

  // CSS and fonts.
  var stylesDir = 'client/css/source/';
  grunt.option('stylesDestDir', 'client/css/');
  var fontsDestDir = 'client/fonts/';

  // Grunt configuration.
  grunt.initConfig({
    // Concat and minimize CSS files.
    cssmin: {
      options: {
        shorthandCompacting: true
      },
      style: {
        files: {
          '<%= grunt.option("stylesDestDir") %>style.min.css': [
            bowerDir + 'bootstrap/dist/css/bootstrap.min.css',
            bowerDir + 'font-awesome-min/css/font-awesome.min.css',
            bowerDir + 'angular-loading-bar/build/loading-bar.min.css',
            stylesDir + 'style.css'
          ]
        }
      }
    },
    // Copy fonts.
    copy: {
      fonts: {
        expand: true,
        flatten: true,
        src: bowerDir + 'font-awesome-bower/fonts/*',
        dest: fontsDestDir,
      },
    },
    // Set up dependency injections for minifying.
    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      app: {
        files: {
          '<%= grunt.option("scriptsSafeDestDir") %>config.js': [scriptsDir + 'config.js'],
          '<%= grunt.option("scriptsSafeDestDir") %>index.js': [scriptsDir + 'index.js'],
          '<%= grunt.option("scriptsSafeDestDir") %>homeCtrl.js': [scriptsDir + 'controllers/homeCtrl.js'],
          '<%= grunt.option("scriptsSafeDestDir") %>ngEnterDir.js': [scriptsDir + 'directives/ngEnterDir.js'],
          '<%= grunt.option("scriptsSafeDestDir") %>pokeDetailDir.js': [scriptsDir + 'directives/pokeDetailDir.js'],
          '<%= grunt.option("scriptsSafeDestDir") %>pokeListDir.js': [scriptsDir + 'directives/pokeListDir.js'],
          '<%= grunt.option("scriptsSafeDestDir") %>myPokemonSrv.js': [scriptsDir + 'services/myPokemonSrv.js']
        }
      }
    },
    // JS minification.
    uglify: {
      options: {
        mangle: false // Don't mangle (controller names, etc.)
      },
      js: {
        options: {
          sourceMap: true, // Generate source maps to show line numbers in console (outputs and errors).
          sourceMapName: '<%= grunt.option("scriptsDestDir") %>app.js.map'
        },
        files: {
          '<%= grunt.option("scriptsDestDir") %>app.min.js': [
            bowerDir + 'jquery/dist/jquery.min.js',
            bowerDir + 'angular/angular.min.js',
            bowerDir + 'angular-ui-router/release/angular-ui-router.min.js',
            bowerDir + 'angular-animate/angular-animate.min.js',
            bowerDir + 'angular-loading-bar/build/loading-bar.min.js',
            bowerDir + 'bootstrap/dist/js/bootstrap.min.js',
            scriptsSafeDestDir + 'config.js',
            scriptsSafeDestDir + 'index.js',
            scriptsSafeDestDir + 'homeCtrl.js',
            scriptsSafeDestDir + 'ngEnterDir.js',
            scriptsSafeDestDir + 'pokeDetailDir.js',
            scriptsSafeDestDir + 'pokeListDir.js',
            scriptsSafeDestDir + 'myPokemonSrv.js'
          ]
        }
      }
    },
    watch: {
      scripts: {
        files: [stylesDir + '**/*.css', scriptsDir + '**/*.js', 'Gruntfile.js'],
        tasks: ['cssmin', 'ngAnnotate', 'uglify'],
        options: {
          interrupt: true,
        }
      }
    }
  });

  // Load tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default grunt task concats and minifies JS and CSS.
  grunt.registerTask('default', ['cssmin', 'copy', 'ngAnnotate', 'uglify']);
};
