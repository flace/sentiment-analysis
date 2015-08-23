export default ngModule => {
  ngModule.directive('layout', [
    function () {
      return {
        restrict: 'E',
        template: require('./layout.html'),
        controller: 'LayoutCtrl',
        controllerAs: 'vm'
      };
    }
  ]);

  ngModule.controller('LayoutCtrl', [
    '$state',
    function ($state) {
      let vm = this;
      vm.$state = $state;
    }
  ]);
};
