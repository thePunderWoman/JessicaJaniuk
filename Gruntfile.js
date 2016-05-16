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
          'dist/css/site.css': 'src/sass/site.scss',       // 'destination': 'source'
        }
      }
    },
    browserify: {
       dist: {
          options: {
             transform: [
                ["babelify", { presets: ["es2015"] }]
             ]
          },
          files: {
               "./dist/app/app.js": ["./src/app.js"],
               "./dist/app/directives/title.js": ["./src/directives/title.js"],
               "./dist/app/components/LogoHeader.js": ["./src/components/LogoHeader.js"],
               "./dist/app/controllers/HomeCtrl.js": ["./src/controllers/HomeCtrl.js"],
               "./dist/app/controllers/BlogCtrl.js": ["./src/controllers/BlogCtrl.js"],
               "./dist/app/controllers/AboutCtrl.js": ["./src/controllers/AboutCtrl.js"],
               "./dist/app/controllers/ConnectCtrl.js": ["./src/controllers/ConnectCtrl.js"],
               "./dist/app/controllers/R2D2Ctrl.js": ["./src/controllers/R2D2Ctrl.js"],
               "./dist/app/controllers/PhotoCtrl.js": ["./src/controllers/PhotoCtrl.js"],
               "./dist/app/controllers/AlbumCtrl.js": ["./src/controllers/AlbumCtrl.js"],
               "./dist/app/services/FirebaseService.js": ["./src/services/FirebaseService.js"],
               "./dist/app/services/FlickrService.js": ["./src/services/FlickrService.js"],
               "./dist/app/register.js": ["./src/services/FlickrService.js"],
          }
       }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'bower_components/Materialize/dist/font/', src: ['**'], dest: 'dist/fonts'},
          {expand: true, cwd: 'bower_components/font-awesome/fonts/', src: ['**'], dest: 'dist/fonts'},
          {expand: true, cwd: 'bower_components/modernizr/', src: ['modernizr.js'], dest: 'dist/js'},
          {expand: true, cwd: 'bower_components/angular/', src: ['angular.min.js', 'angular.min.js.map'], dest: 'dist/js/angular'},
          {expand: true, cwd: 'bower_components/angular-ui-router/release', src: ['angular-ui-router.min.js'], dest: 'dist/js/angular'},
          {expand: true, cwd: 'bower_components/angular-messages/', src: ['angular-messages.min.js','angular-messages.min.js.map'], dest: 'dist/js/angular'},
          {expand: true, cwd: 'bower_components/angular-aria/', src: ['angular-aria.min.js','angular-aria.min.js.map'], dest: 'dist/js/angular'},
          {expand: true, cwd: 'bower_components/angular-animate/', src: ['angular-animate.min.js','angular-animate.min.js.map'], dest: 'dist/js/angular'},
          {expand: true, cwd: 'bower_components/angular-sanitize/', src: ['angular-sanitize.min.js','angular-sanitize.min.js.map'], dest: 'dist/js/angular'},
          {expand: true, cwd: 'bower_components/angularfire/dist/', src: ['angularfire.min.js'], dest: 'dist/js/angular'},
          {expand: true, cwd: 'bower_components/firebase/', src: ['firebase.js'], dest: 'dist/js'},
          {expand: true, cwd: 'bower_components/jQuery/dist', src: ['jquery.min.js','jquery.min.map'], dest: 'dist/js'},
          {expand: true, cwd: 'node_modules/angular-material/', src: ['angular-material.min.js'], dest: 'dist/js/angular'},
          {expand: true, cwd: 'node_modules/angular-material/', src: ['angular-material.min.css'], dest: 'dist/css'},
          {expand: true, cwd: 'node_modules/angular-material/layouts', src: ['angular-material.layouts.min.css','angular-material.layout-attributes.min.css'], dest: 'dist/css'},
          {expand: true, cwd: 'src/', src: ['register.js'], dest: 'dist/app'},
          {expand: true, cwd: 'src/views', src: ['*.html'], dest: 'dist/app/views'},
          {expand: true, cwd: 'src/', src: ['*.html'], dest: 'dist/'},
        ]
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      },
      html: {
        files: ['src/**/*.html', 'src/*.html'],
        tasks: ['copy']
      },
      scripts: {
        files: ["src/**/*.js"],
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