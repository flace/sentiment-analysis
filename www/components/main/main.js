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
    'MainFactory',
    function (mainFactory) {
      let vm = this;

      vm.loading = false;
      vm.model = {};

      vm.send = () => {
        mainFactory.send(vm.model, (err, data) => {
          console.log(err, data);
        });
        vm.model = {};
      };
    }
  ]);
};
