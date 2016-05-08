
module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        ngAnnotate:{
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    'tmp/min-safe/beesService.js': ['app/views/beesService.js'],
                    'tmp/min-safe/beesController.js': ['app/views/beesController.js'],
                    'tmp/min-safe/app.js': ['app/app.js']
                }
            }
        },
        concat:{
            scripts: {
                src: 'tmp/min-safe/*.js',
                dest: 'tmp/main.js'
            }
        },
        uglify:{
            scripts: {
                files: {
                    'app/assets/js/main.js' : 'tmp/main.js'
                }
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
                    "tmp/main.css": "less/main.less" // destination file and source file
                }
            }
        },
        cssmin: {
            development: {
                files: {
                    'app/assets/css/main.css': ['tmp/main.css']
                }
            }

        },
        watch: {
            scripts: {
                files: ['app/**/*.js'],
                tasks: ['ngAnnotate','concat', 'uglify'],

                options: {
                    spawn: false
                }
            },
            styles: {
                files: ['less/**/*.less'], // which files to watch
                tasks: ['less', 'cssmin'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.registerTask('default', ['less', 'cssmin', 'ngAnnotate' , 'concat' , 'uglify' ,'watch']);
};