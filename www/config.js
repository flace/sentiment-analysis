export default ngModule => {
  let config = {};
  config.apiUrl = ON_PROD ? 'https://sent-a.herokuapp.com' : 'http://localhost:8822';
  ngModule.constant('config', config);
};
