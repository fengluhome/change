module.exports = function (grunt) {

    // Project configuration.   cityCascading
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            basic_and_extras: {
                files: {
                    'output/Content/Change/Scripts/change.js':
                      [
                          'Content/Change/Scripts/change-core.js',
                          'Content/Change/Scripts/change-ajax.js',
                          'Content/Change/Scripts/change-upload.js',
                          'Content/Change/Scripts/change-print.js',
                          'Content/Change/Scripts/change-ui.js',
                          'Content/Change/Scripts/change-animframe.js',
                          'Content/Change/Scripts/change-serialize.js',
                          'Content/Change/Scripts/change-datapager.js',
                          'Content/Change/Scripts/change-calendar.js',
                          'Content/Change/Scripts/change-cityCascading.js',
                          'Content/Change/Scripts/change-authority.js',
                          'Content/Change/Scripts/change-valid.js',
                          'Content/Change/Scripts/change-phone.js'
                      ],

                    'output/Content/Change/Css/change.css': ['Content/Change/Css/change.css']

                },
            },
        },
        cssmin: {
            combine: {
                files: {
                    'output/Content/Change/Css/change.min.css': ['Content/Change/Css/change.css']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },

            release: {//任务四：合并压缩
                files: {
                    'output/Content/Change/Scripts/change.min.js':
                        [
                          'Content/Change/Scripts/change-core.js',
                          'Content/Change/Scripts/change-ajax.js',
                          'Content/Change/Scripts/change-upload.js',
                          'Content/Change/Scripts/change-print.js',
                          'Content/Change/Scripts/change-ui.js',
                          'Content/Change/Scripts/change-animframe.js',
                          'Content/Change/Scripts/change-serialize.js',
                          'Content/Change/Scripts/change-datapager.js',
                          'Content/Change/Scripts/change-calendar.js',
                          'Content/Change/Scripts/change-cityCascading.js',
                          'Content/Change/Scripts/change-authority.js',
                          'Content/Change/Scripts/change-valid.js',
                          'Content/Change/Scripts/change-phone.js'
                        ]
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'Content/Change/Images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'output/Content/Change/Images'
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
                    src: ['Content/Change/Scripts/change.js', 'Content/Change/Scripts/valid.js']
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

    //Default task(s).  
    // grunt.registerTask('default', ['jshint']);
    // grunt.registerTask('bulid', ['concat', 'uglify']);
    grunt.registerTask('default', ['concat', 'cssmin', 'uglify', 'imagemin']);
};