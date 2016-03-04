module.exports = function(grunt) {
    grunt.initConfig({
	htmlmin: {
	    build: {
		options: {
		    removeComments: true,
		    collapseWhitespace: true
		},
		files: {
		    'build/index.html': 'src/index.html'
		}
	    }
	},
	concat: {
	    app: {
		src: ['src/js/constants.js',
		      'src/js/utilities.js',
		      'src/js/options.js',
		      'src/js/preferences.js',
		      'src/js/question.js',
		      'src/js/app_controller.js'],
		dest: 'build/js/alchemy.min.js',  // TODO: for production, change dest to 'staging/alchemy.js'
	    },
	},
	uglify: {
	    options: {
		mangle: false
	    },
	    app: {
		files: {
		    //'build/js/alchemy.min.js': ['staging/alchemy.js'],  // TODO: for production, uncomment this line
		}
	    }
	},
	sass: {
	    build: {
		files: {
		    "staging/style.css": "src/css/main.scss"
		}
	    }
	},
	cssmin: {
	    target: {
		files: {
		    'build/css/style-min.css': ['staging/style.css']
		}
	    },
	},
	watch: {
	    js: {
		files: ['src/js/*.js'],
		tasks: ['uglify', 'concat'],
	    },
	    css: {
		files: ['src/css/*.scss', 'src/css/*.css'],
		tasks: ['sass', 'cssmin'],
	    },
	    html: {
		files: ['src/*.html'],
		tasks: ['htmlmin']
	    },
	},
    });

    grunt.registerTask('build', ['htmlmin', 'concat', 'uglify', 'sass', 'cssmin']);
    grunt.registerTask('default', ['build', 'watch']);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
