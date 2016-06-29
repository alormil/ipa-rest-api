const restify = require('restify');
const server = restify.createServer();
const routes = require('./routes');
const port = 3000;

server.use(restify.fullResponse());
server.use(restify.bodyParser());
server.use(restify.queryParser());

server.listen(port, (err) => {
    if (err) {
        console.error(err);
    }
});

routes(server);

module.exports = server;
