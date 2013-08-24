module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
		    server: {
		    	options: {
		        	port: 9001
		      	}
		    }
		},

		compass: {                  
		    dev: {
		      options: {
		        sassDir: 'sass',
		        cssDir: 'css'
		      }
		    }
  		},

		watch: {
			compass: {
				files: ['sass/**/*.scss'],
				tasks: ['compass:dev'],
				options: {
					livereload: true
				}
			},
  		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.registerTask('server', [ 'compass:dev', 'connect', 'watch' ]);
}