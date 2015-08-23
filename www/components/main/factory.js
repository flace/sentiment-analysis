let rg = require('rangen');

export default ngModule => {
  ngModule.factory('MainFactory', [
    '$http', 'config',
    function ($http, config) {
      let api = config.apiUrl;

      function send(data, cb) {
        $http.get(`${api}/?tag=${data.tag}`).then(response => {
          //cb(response.data.error, response.data.data);
          console.log(response.data);
          let pos = rg.num(0, 100);
          cb(null, {
            count: rg.num(1000, 9999),
            neg: pos,
            pos: 100 - +pos,
            tag: data.tag
          });
        }, cb);
      }

      return {send};
    }
  ]);
};
