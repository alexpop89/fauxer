module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            images: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['bin/images/*'],
                    dest: 'public/images',
                    filter: 'isFile'
                }]
            },

            scripts: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['bin/scripts/remote-scripts/fauxr.js', 'bin/scripts/remote-scripts/fauxr-controller.js'],
                    dest: 'public/',
                    filter: 'isFile'
                }]
            }
        },

        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },

                files: {
                    "public/stylesheets/main.css": "bin/styles/main.less",
                    "public/stylesheets/pages/index.css": "bin/styles/pages/index.less"
                }
            }
        },

        uglify: {
            options: {
                mangle: true,
                mangleProperties: false
            },

            target: {
                files: {
                    'public/fauxr.min.js': ['public/fauxr.js'],
                    'public/fauxr-controller.min.js': ['public/fauxr-controller.js']
                }
            }
        },

        watch: {
            files: ['Gruntfile.js', 'bin/scripts/**/*.js', 'bin/styles/**/*.less', 'bin/images/**/*.html'],
            tasks: ['dev']
        }
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('deploy', ['less', 'copy', 'uglify']);
    grunt.registerTask('dev', ['less', 'copy', 'uglify', 'watch']);

};