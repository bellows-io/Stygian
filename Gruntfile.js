/* globals module:false */
module.exports = function(grunt) {
	"use strict";

	var packageInfo = grunt.file.readJSON('package.json');

	grunt.loadNpmTasks('grunt-jslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-exorcise');
	grunt.loadNpmTasks('grunt-esdoc');

	grunt.initConfig({
		pkg: packageInfo,
		esdoc: {
			bundle: {
				options: {
					source: './src',
					destination: 'doc'
				}
			}
		},
		jslint: {
			bundle: {
				src: [
					'./src/**/*.es6'
				],
				directives: {
					'continue': true,
					bitwise: true,
					browser: true,
					devel: true,
					eqeq: true,
					es6: true,
					node: true,
					ass: true,
					plusplus: true,
					regexp: true,
					white: true,
					newcap: true,
					unparam: true,
					predef: [],
				}
			}
		},
		jest: {
			options: {
				config: ".jestconfig"
			}
		},
		browserify: {
			stygian: {
				options: {
					browserifyOptions: {
						debug:true
					},
					extensions: ['.js', '.json', '.es6'],
					transform: [
						["babelify", {}]
					],
				},
				files: {
					"./build/stygian.min.js": ["./stygian-core/stygian.es6"]
				}
			},
			stygianPlayer: {
				options: {
					browserifyOptions: {
						debug:true
					},
					extensions: ['.js', '.json', '.es6'],
					transform: [
						["babelify", {}]
					],
				},
				files: {
					"./build/stygian-player.min.js": ["./stygian-player/stygian-player.es6"]
				}
			}
		},
		exorcise: {
			bundle: {
				files: {
					'build/capstone.js.map': ['build/capstone.js']
				}
			}
		},
		watch: {
			jsdoc: {
				files: ['README.md', 'src/**/*.es6'],
				tasks: ['jsdoc'],
				options: {
					spawn: false,
				},
			},
			stygian: {
				files: [
					"./stygian-core/**/*.js",
					"./stygian-core/**/*.es6"
				],
				tasks: ["stygian"]
			},
			stygianPlayer: {
				files: [
					"./stygian-player/**/*.js",
					"./stygian-player/**/*.es6"
				],
				tasks: ["stygianPlayer"]
			}
		}
	});

	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("stygian", ["browserify:stygian"]);
	grunt.registerTask("stygianPlayer", ["browserify:stygianPlayer"]);
	grunt.registerTask("default", ["browserify"]);

};
