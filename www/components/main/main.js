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

      vm.donutOptions = mainFactory.donutOptions;
      vm.lineOptions = mainFactory.lineOptions;

      vm.send = () => {
        vm.done = false;
        vm.loading = true;
        vm.error = false;
        mainFactory.send(vm.model, (err, data) => {
          vm.loading = false;
          if (err) {
            vm.error = true;
            return;
          }
          vm.donutData = data.donut;
          vm.lineData = data.timeseries;

          vm.done = true;
        });
        vm.model = {};
      };
    }
  ]);
};
