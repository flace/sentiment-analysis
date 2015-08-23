export default ngModule => {
  ngModule.directive('main', [
    function () {
      return {
        restrict: 'E',
        template: require('./main.html'),
        controller: 'MainCtrl',
        controllerAs: 'vm'
      };
    }
  ]);

  ngModule.controller('MainCtrl', [
    function () {
      let vm = this;
      vm.test = 123;
      console.log(vm);
    }
  ]);
};
