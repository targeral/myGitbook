(function() {
    module.exports = function(grunt) {
        var remapify = require('remapify');
        var conffeeify = require('coffeeify');
        var stringify = require('stringify');
        grunt.initConfig({
            clean : {
                js : ['js/js'],
                css : ['css/css']
            },

            concat : {
                js : {
                    files : {
                        'js/gitbook.js' : ['js/my-gitbook.js', 
                                           'js/my-gitbook.template.js', 
                                           'js/my-gitbook.rooter.js', 
                                           'js/my-gitbook.font.js',
                                           'js/my-gitbook.background.js',
                                           'js/my-gitbook.dropdown.js',
                                           'js/my-gitbook.list.js',
                                           'js/my-gitbook.render.js',
                                           'js/my-gitbook.config.js']
                    }
                },

                css : {
                    files : {
                        'css/gitbook.css' : ['css/*.css']
                    }
                }
            },

            uglify : {
                js : {
                    files : {
                        'js/gitbook.min.js' : ['js/gitbook.js']
                    }
                }
            },

            cssmin : {
                options: {
                    shorthandCompacting: false,
                    roundingPrecision: -1
                },
                target: {
                    files: {
                        'css/gitbook.min.css': ['css/gitbook.css']
                    }
                }
            }
        });

        grunt.loadNpmTasks("grunt-contrib-clean");
        grunt.loadNpmTasks("grunt-contrib-concat");
        grunt.loadNpmTasks("grunt-contrib-uglify");
        grunt.loadNpmTasks('grunt-contrib-cssmin');

        grunt.registerTask("default", function() {
            return grunt.task.run(["clean", "concat"]);
        });

        grunt.registerTask("js", function() {
            return grunt.task.run(["clean:js", "concat:js", "uglify"]);
        });
        grunt.registerTask("css", function() {
            return grunt.task.run(["clean:css", "concat:css","cssmin"]);
        })
    };
}).call(this);