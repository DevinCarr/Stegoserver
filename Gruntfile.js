module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        nodeunit: {
            tests: ['test/**/*_test.js']
        },
        jshint: {
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib: {
                src: ['lib/**/*.js']
            },
            test: {
                src: ['test/**/*.js']
            }
        }
    });
    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Tasks.
    grunt.registerTask('default', ['jshint', 'nodeunit']);
};
