export default ngModule => {
  ngModule.directive('about', [
    function () {
      return {
        restrict: 'E',
        template: require('./about.html'),
        controller: 'AboutCtrl',
        controllerAs: 'vm'
      };
    }
  ]);

  ngModule.controller('AboutCtrl', [
    function () {

    }
  ]);
};
