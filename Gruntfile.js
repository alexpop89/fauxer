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
                    "public/stylesheets/main.css": "bin/styles/main.less"
                }
            }

        },

        watch: {
            files: ['Gruntfile.js', 'bin/scripts/**/*.js', 'bin/styles/**/*.less', 'bin/images/**/*.html'],
            tasks: ['less', 'copy']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('deploy', ['less', 'copy']);
    grunt.registerTask('dev', ['less', 'copy', 'watch']);

};