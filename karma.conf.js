//jshint strict: false
module.exports = function(config) {
    config.set({

        basePath: './',

        files: [
            'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.js',
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.js',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.js',
            'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.3/angular-ui-router.js',
            'client/api/web-app/**/*.js',
            'client/api/web-app/**/*.html',
            'test/**/*.js'
        ],

      
      
        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};