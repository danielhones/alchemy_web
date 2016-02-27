module.exports = function(grunt) {
    grunt.initConfig({
	uglify: {
	    my_target: {
		files: {
		    'build/alchemy.min.js': ['src/alchemy.js'],
		}
	    }
	},
	cssmin: {
	    target: {
		files: {
		    'build/style-min.css': ['src/style.css']
		}
	    },
	},
	watch: {
	    js: {
		files: ['src/*.js'],
		tasks: ['uglify'],
	    },
	    css: {
		files: ['src/*.css'],
		tasks: ['cssmin'],
	    },
	},
    });

    grunt.registerTask('build', ['uglify', 'cssmin']);
    grunt.registerTask('default', ['build', 'watch']);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
