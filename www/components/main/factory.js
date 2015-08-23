export default ngModule => {
  ngModule.factory('MainFactory', [
    '$http', 'config',
    function ($http, config) {
      let api = config.apiUrl;

      function send(data, cb) {
        $http.get(`${api}/sentiment?tag=${data.tag}`).then(response => {
          cb(response.data.error, response.data.data);
        }, cb);
      }

      return {send};
    }
  ]);
};
