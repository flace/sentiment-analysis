//let rg = require('rangen');

export default ngModule => {
  ngModule.factory('MainFactory', [
    '$http', 'config',
    function ($http, config) {
      let api = config.apiUrl;

      function send(data, cb) {
        $http.get(`${api}/${data.tag}`).then(response => {
          cb(response.data.error, response.data.data);
          //let pos = rg.num(0, 80);
          //let temp = 100 - pos;
          //let neg = rg.num(0, temp);
          //let neutr = 100 - pos - neg;
          //
          //let ukr = [];
          //let fra = [];
          //let usa = [];
          //
          //for (let i = 1; i < 31; i++) {
          //  ukr.push({x: i, y: rg.num(-5, 5)});
          //  fra.push({x: i, y: rg.num(-4, 3)});
          //  usa.push({x: i, y: rg.num(-5, 5)});
          //}
          //
          //cb(null, {
          //  donut: [
          //    {
          //      key: 'Positive',
          //      y: pos
          //    },
          //    {
          //      key: 'Neutral',
          //      y: neutr
          //    },
          //    {
          //      key: 'Negative',
          //      y: neg
          //    }
          //  ],
          //  line: [
          //    {
          //      values: ukr,
          //      key: 'Ukraine',
          //      color: '#ff7f0e'
          //    },
          //    {
          //      values: fra,
          //      key: 'France',
          //      color: '#2ca02c'
          //    },
          //    {
          //      values: usa,
          //      key: 'USA',
          //      color: '#7777ff'
          //    }
          //  ]
          //});
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
            dispatch: {
              stateChange: function () {
                console.log('stateChange');
              },
              changeState: function () {
                console.log('changeState');
              },
              tooltipShow: function () {
                console.log('tooltipShow');
              },
              tooltipHide: function () {
                console.log('tooltipHide');
              }
            },
            xAxis: {
              axisLabel: 'Month'
            },
            yAxis: {
              axisLabel: 'Sentiment',
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
          },
          subtitle: {
            enable: true,
            text: 'June, 2015',
            css: {
              'text-align': 'center',
              margin: '10px 13px 0px 7px'
            }
          },
          caption: {
            enable: true,
            html: '<b>Figure 1.</b> Lorem ipsum',
            css: {
              'text-align': 'justify',
              margin: '10px 13px 0px 7px'
            }
          }
        };
      }

      return {send, donutOptions, lineOptions};
    }
  ]);
};
