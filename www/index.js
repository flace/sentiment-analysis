let ngModule = angular.module('app', ['ui.router']);

ngModule.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    $stateProvider
      .state('main', {
        url: '/',
        template: require('./components/main/main.html')
      });

//.state('news', {
//  abstract: true,
//  template: '<ui-view></ui-view>',
//  resolve: {lazy: ['$ocLazyLoad', $ocLazyLoad => $ocLazyLoad.load(`./${hash}news.js`)]}
//})
//.state('news.main', {
//  url: '/news',
//  template: '<news-main></news-main>'
//})
  }
]);

angular.bootstrap(document, ['app']);
