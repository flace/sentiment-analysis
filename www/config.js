export default ngModule => {
  let config = {};
  config.apiUrl = ON_PROD ? 'http://gmail.com' : 'http://gmail.com';
  ngModule.constant('config', config);
};
