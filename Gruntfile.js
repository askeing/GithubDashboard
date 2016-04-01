module.exports = function (grunt) {
    grunt.initConfig({
        'clean': {
            dest: ['dest']
        },
        'uglify': {
            javascript_files: {
                files: {
                    'dest/js/dashboard.min.js': ['src/js/dashboard.js']
                }
            }
        },
        'cssmin': {
            css_files: {
                files: {
                    'dest/css/all.min.css': ['src/css/font-awesome.min.css', 'src/css/bootstrap.min.css', 'src/css/bootstrap-theme.min.css', 'src/css/main.css']
                }
            }
        },
        'compile-handlebars': {
            index: {
                files: [{
                    src: 'src/index.hbs',
                    dest: 'dest/index.html'
                }],
                templateData: 'src/config/config.json'
            }
        },
        'copy': {
            config: {
                expand: true,
                cwd: 'src/config',
                src: '**',
                dest: 'dest/config'
            },
            js: {
                expand: true,
                cwd: 'src/js',
                src: ['*.min.js', '*.html'],
                dest: 'dest/js'
            },
            fonts: {
                expand: true,
                cwd: 'src/fonts',
                src: '**',
                dest: 'dest/fonts'
            },
            root: {
                expand: true,
                cwd: 'src/',
                src: 'favicon.png',
                dest: 'dest/'
            },
        },
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-compile-handlebars');

    grunt.registerTask('default', ['clean', 'uglify', 'cssmin', 'compile-handlebars', 'copy']);
};
