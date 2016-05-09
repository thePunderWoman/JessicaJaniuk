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
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      },
      jshint: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'bower_components/Materialize/fonts/', src: ['**'], dest: 'dist/fonts'},
          {expand: true, cwd: 'bower_components/modernizr/', src: ['modernizr.js'], dest: 'dist/js'},
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['jshint']);

};