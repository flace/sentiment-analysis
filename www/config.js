export default ngModule => {
  let config = {};
  config.apiUrl = ON_PROD ? 'http://swapi.co/api/people/1' : 'http://localhost:8080';
  ngModule.constant('config', config);
};
