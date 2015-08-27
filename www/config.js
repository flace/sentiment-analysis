export default ngModule => {
  let config = {};
  config.apiUrl = ON_PROD ? 'http://swapi.co/api/people/1' : 'http://otelnov.github.io/sentiment-analysis';
  ngModule.constant('config', config);
};
