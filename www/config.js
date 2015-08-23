export default ngModule => {
  let config = {};
  config.apiUrl = ON_PROD ? 'http://swapi.co/api/people/1' : 'http://swapi.co/api/people/1';
  ngModule.constant('config', config);
};
