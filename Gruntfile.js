module.exports = function(grunt){
  [
    'grunt-eslint',
    'grunt-cafe-mocha',
    'grunt-run',
    'grunt-exec',
    'grunt-check-pages'
  ].forEach(function(task){
    grunt.loadNpmTasks(task)
  })

  grunt.initConfig({

    eslint: {
      app: ['tigernodeinspace.js', 'public/js/**/*.js',
        'lib/**/*.js'],
      qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
    },
    cafemocha: {
      all: { src: 'qa/tests-unit.js', options: { ui: 'tdd' }, }
    },
    run: {
      jest: {
        cmd: 'jest',
        args: ['*.test.js']
      }
    },
    exec: { // cmd linkchecker localh ko
      linkchecker:
      //       { cmd: 'linkchecker http://localhost:3000' }
      { cmd: 'ls' }
    },
    
    /*     checkPages: {
      development: {
        options: {
          pageUrls: [
            'http://localhost:3000/',
            'http://localhost:3000/quotes',
            'http://localhost:3000/about'
          ],
          checkLinks: true,
          linksToIgnore: [
            'http://localhost:3000/broken.html'
          ],
          noRedirects: true,
          summary: true,
          maxResponseTime: 200,
          userAgent: 'custom-user-agent/1.2.3'
        }
      },
      production: {
        options: {
          pageUrls: [
            'https://tigernodeinspace.herokuapp.com/',
          ],
          checkLinks: true,
          maxResponseTime: 500
        }
      }
    } */

  })

  grunt.registerTask('default', ['eslint','cafemocha','run','exec',/* 'checkPages' */])
}
