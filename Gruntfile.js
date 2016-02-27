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
	    get_comments: {
		src: ['src/js/alchemy.js'],
		dest: 'src/concat/alchemy.js',
	    },
	},
	uglify: {
	    my_target: {
		files: {
		    'build/js/alchemy.min.js': ['src/concat/alchemy.js'],
		}
	    }
	},
	cssmin: {
	    target: {
		files: {
		    'build/css/style-min.css': ['src/css/style.css']
		}
	    },
	},
	watch: {
	    js: {
		files: ['src/js/*.js'],
		tasks: ['uglify'],
	    },
	    css: {
		files: ['src/css/*.css'],
		tasks: ['cssmin'],
	    },
	    html: {
		files: ['src/*.html'],
		tasks: ['htmlmin']
	    },
	},
    });

    grunt.registerTask('build', ['htmlmin', 'concat', 'uglify', 'cssmin']);
    grunt.registerTask('default', ['build', 'watch']);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
