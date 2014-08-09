module.exports = function (grunt) {

    // Project configuration.  
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            basic_and_extras: {
                files: {
                    'output/Scripts/base.js': ['Scripts/base.js', 'Scripts/valid.js'],

                },
            },
        },
        cssmin: {
            combine: {
                files: {
                    'output/Css/base.min.css': ['Css/base.css']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },

            release: {//任务四：合并压缩
                files: {
                    'output/Scripts/base.min.js': ['Scripts/base.js', 'Scripts/valid.js'],
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'Images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'output/Images'
                }]
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
            },

            with_overrides: {
                options: {
                    curly: false,
                    undef: true,
                },
                files: {
                    src: ['Scripts/base.js', 'Scripts/ReturnCode.js', 'Scripts/valid.js']
                },
            }
        }
    });
    //css压缩插件
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //文件copy
    grunt.loadNpmTasks('grunt-contrib-concat');
    // 压缩插件.  
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).  
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('bulid', ['concat', 'uglify']);
    //grunt.registerTask('bulid', ['concat', 'cssmin', 'uglify', 'imagemin']);
};