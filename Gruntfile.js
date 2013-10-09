module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		develop: {
			server: {
				file: './app/app.js'
			}
		},
		watch: {
			options: {
				livereload: true
			},
			css: {
				files: ['public/stylesheets/*.scss'],
				tasks: ['compass:dev']
			},
//			node: {
//				files: ['app/*.js'],
//				tasks: ['develop']
//			},
			views: {
				files: ['app/views/*.hbs']
				//tasks: ['compass'],
			}

		}, compass: {
			dist: {
				options: {
					sassDir: 'public/stylesheets/*.scss',
					cssDir: 'public/stylesheets/*.css',
					environment: 'production'
				}
			},
			dev: {
				options: {
					sassDir: 'public/stylesheets',
					cssDir: 'public/stylesheets'
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-develop');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.registerTask('default', ['develop', 'watch']);
//	grunt.registerTask('default', ['develop']);
	grunt.registerTask('server', ['develop']);
};

