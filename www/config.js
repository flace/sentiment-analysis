export default ngModule => {
  let config = {};
  config.apiUrl = ON_PROD ? 'https://sent-a.herokuapp.com' : 'http://localhost:8888/api/sentiment';
  ngModule.constant('config', config);
};
