let ngModule = angular.module('app', ['ui.router', 'nvd3']);

ngModule.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('sa', {
        abstract: true,
        template: '<layout></layout>'
      })
      .state('sa.main', {
        url: '/',
        template: '<main></main>'
      })
      .state('sa.about', {
        url: '/about',
        template: '<about></about>'
      });
  }
]);

require('./assets/styles.css');
require('./config.js')(ngModule);
require('./components/layout.js')(ngModule);
require('./components/about/about.js')(ngModule);
require('./components/main/main.js')(ngModule);
require('./components/main/factory.js')(ngModule);

angular.bootstrap(document, ['app']);
