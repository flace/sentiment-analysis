export default ngModule => {
  let config = {};
  config.apiUrl = ON_PROD ? 'https://telnov.com/api/sentiment' : 'http://localhost:8888/api/sentiment';
  ngModule.constant('config', config);
};
