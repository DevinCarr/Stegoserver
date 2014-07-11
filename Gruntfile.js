module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  jshint: {
    myFiles: ['./src/*.js']
  },
  uglify: {
    options: {
      banner: '/*!\n * <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * Copyright (c) 2014 <%= pkg.author %>; Licensed MIT \n*/\n'
    },
    release: {
      options:{
        mangle: true,
        compress: true
      },
      files: {
        './build/release/<%= pkg.name %>.min.js': ['./src/stego_server.js','./src/stego_console.js','./src/stego_run.js'],
        './<%= pkg.name %>.min.js': ['./src/stego_server.js','./src/stego_console.js','./src/stego_run.js']
      }
    }
  },
  concat: {
    options: {
      separator: '\n',
    },
    dist: {
      src: ['./src/stego_server.js','./src/stego_console.js','./src/stego_run.js'],
      dest: './build/dev/<%= pkg.name %>.dev.min.js'
    },
  }
});
  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Tasks.
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('dev', ['jshint','concat']);
  grunt.registerTask('release', ['jshint','uglify:release']);
}
