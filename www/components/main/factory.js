export default ngModule => {
  ngModule.factory('MainFactory', [
    '$http', 'config',
    function ($http, config) {
      let api = config.apiUrl;

      function send(data, cb) {
        $http.get(`${api}/${data.tag}`).then(response => {
          if (response.data.error || !response.data.data) {
            return cb(true);
          }
          if (response.data.data.line) {
            response.data.data.line.forEach(line => {
              line.values.forEach(val => {
                val.x = new Date(val.x);
              });
            });
            cb(response.data.error, response.data.data);
          }
        }, cb);
      }

      let donutOptions = {
        chart: {
          type: 'pieChart',
          height: 450,
          donut: true,
          x: function (d) {
            return d.key;
          },
          y: function (d) {
            return d.y;
          },
          showLabels: true,
          labelType: 'percent',
          pie: {
            startAngle: function (d) {
              return d.startAngle;
            },
            endAngle: function (d) {
              return d.endAngle;
            }
          },
          transitionDuration: 500,
          legend: {
            margin: {
              top: 5,
              right: 140,
              bottom: 5,
              left: 0
            }
          }
        }
      };

      function lineOptions(model) {
        return {
          chart: {
            type: 'lineChart',
            height: 450,
            margin: {
              top: 20,
              right: 20,
              bottom: 40,
              left: 55
            },
            x: function (d) {
              return d.x;
            },
            y: function (d) {
              return d.y;
            },
            useInteractiveGuideline: true,
            //dispatch: {
            //  stateChange: function () {
            //    console.log('stateChange');
            //  },
            //  changeState: function () {
            //    console.log('changeState');
            //  },
            //  tooltipShow: function () {
            //    console.log('tooltipShow');
            //  },
            //  tooltipHide: function () {
            //    console.log('tooltipHide');
            //  }
            //},
            xAxis: {
              axisLabel: 'Date',
              tickFormat: function (d) {
                return d3.time.format('%b, %d')(new Date(d));
              }
            },
            xScale: d3.time.scale(),
            yAxis: {
              axisLabel: 'Points',
              tickFormat: function (d) {
                return d3.format('.02f')(d);
              },
              axisLabelDistance: 30
            },
            callback: function () {
              console.log('!!! lineChart callback !!!');
            }
          },
          title: {
            enable: true,
            text: 'Results for tag #' + model.tag
          }
          //subtitle: {
          //  enable: true,
          //  text: 'June, 2015',
          //  css: {
          //    'text-align': 'center',
          //    margin: '10px 13px 0px 7px'
          //  }
          //},
          //caption: {
          //  enable: true,
          //  html: '<b>Figure 1.</b> Lorem ipsum',
          //  css: {
          //    'text-align': 'justify',
          //    margin: '10px 13px 0px 7px'
          //  }
          //}
        };
      }

      return {send, donutOptions, lineOptions};
    }
  ]);
};
