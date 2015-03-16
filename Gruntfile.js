module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        folders: {
            webapp: {
                root: 'src/main/webapp/',
                build: 'src/main/webapp/WEB-INF/'
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= folders.webapp.build %>/*',
                        '!<%= folders.webapp.build %>/web.xml',
                        '!<%= folders.webapp.build %>/webmvc-config.xml'
                    ]
                }]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= folders.webapp.root %>index.html',
            options: {
                dest: '<%= folders.webapp.build %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: '<%= folders.webapp.build %>index.html'
        },

        // Copies remaining files to places other tasks can use
        copy: {
            resources: {
                expand: true,
                cwd: '<%= folders.webapp.root %>/../resources/',
                src: ['**/**/*'],
                dest: '<%= folders.webapp.build %>/resources/'
            },
            images: {
                expand: true,
                cwd: '<%= folders.webapp.root %>/image/',
                src: ['**/**/*'],
                dest: '<%= folders.webapp.build %>image/'
            },
            templates: {
                expand: true,
                cwd: '<%= folders.webapp.root %>',
                src: ['index.html', 'templates/**/*.html'],
                dest: '<%= folders.webapp.build %>'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['clean', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'copy', 'usemin']);
};