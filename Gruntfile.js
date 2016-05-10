module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'dist/css/site.css': 'sass/site.scss',       // 'destination': 'source'
        }
      }
    },
    browserify: {
       dist: {
          options: {
             transform: [
                ["babelify"]
             ]
          },
          files: {
               "./dist/app/app.js": ["./src/app.js"]
          }
       }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'bower_components/Materialize/dist/font/', src: ['**'], dest: 'dist/fonts'},
          {expand: true, cwd: 'bower_components/Materialize/dist/js/', src: ['**'], dest: 'dist/js'},
          {expand: true, cwd: 'bower_components/modernizr/', src: ['modernizr.js'], dest: 'dist/js'},
          {expand: true, cwd: 'bower_components/angular/', src: ['angular.min.js', 'angular.min.js.map'], dest: 'dist/js/angular'},
          {expand: true, cwd: 'bower_components/angular-ui-router/release', src: ['angular-ui-router.min.js'], dest: 'dist/js/angular'},
          {expand: true, cwd: 'bower_components/angularfire/dist/', src: ['angularfire.min.js'], dest: 'dist/js/angular'},
          {expand: true, cwd: 'bower_components/firebase/', src: ['firebase.js'], dest: 'dist/js'},
          {expand: true, cwd: 'app/', src: ['*.js'], dest: 'dist/app'},
        ]
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      },
      scripts: {
        files: ["src/*.js"],
        tasks: ["browserify"]
      }
    },    
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('default', ['copy']);
  grunt.registerTask('default', ['watch']);
  grunt.registerTask("build", ["browserify"]);

};