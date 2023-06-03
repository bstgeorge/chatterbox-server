/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};
const messageData = [];
//keys of request are: url,  method,  _postData,  setEncoding,  on,  addListener
var requestHandler = function (request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

  if (request.url === '/classes/messages') {

    if (request.method === 'OPTIONS') {
      let statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(responseObj));

    } else if (request.method === 'GET') {
      let statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(responseObj.results));

    } else if (request.method === 'POST') {
      let statusCode = 201;
      let chunk = '';
      request.on('data', (data) => {
        chunk += data;
        messageData.push(JSON.parse(chunk));
      });
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(messageData));
    }

  } else {
    response.writeHead(404, headers);
    response.end();
  }

};

module.exports.requestHandler = requestHandler;