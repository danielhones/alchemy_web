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
		src: ['src/js/alchemy.js'],
		dest: 'staging/alchemy.js',
	    },
	},
	uglify: {
	    my_target: {
		files: {
		    'build/js/alchemy.min.js': ['staging/alchemy.js'],
		}
	    }
	},
	sass: {
	    build: {
		options: {
		    style: 'expanded' // i dunno
		},
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
		tasks: ['uglify'],
	    },
	    css: {
		files: ['src/css/*.scss'],
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
