module.exports = function(config){

  let module = {};

  //Handle the webhook subscription request from Facebook
  module._setupTokenCheck = function (app) {
    app.get('/webhook', function(request, response) {
        if (request.query['hub.mode'] === 'subscribe' &&
    		request.query['hub.verify_token'] === config.VERIFY_TOKEN) {
            console.log('Validated webhook');
            response.status(200).send(request.query['hub.challenge']);
        } else {
            console.error('Failed validation. Make sure the validation tokens match.');
            response.sendStatus(403);
        }
    });
  }

  module._setupHeartbeat = function(app) {
    app.get('/', function(request, response) {
      response.status(200).send("Hello, I'm up and running!");
    })
  }

  return module;

}
