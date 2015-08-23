let ngModule = angular.module('app', ['ui.router']);

ngModule.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    $stateProvider
      .state('sa', {
        abstract: true,
        template: require('./components/layout.html')
      })
      .state('sa.main', {
        url: '/',
        template: '<main></main>'
      });
  }
]);

require('./assets/styles.css');
require('./config.js')(ngModule);
require('./components/main/main.js')(ngModule);
require('./components/main/factory.js')(ngModule);

angular.bootstrap(document, ['app']);
