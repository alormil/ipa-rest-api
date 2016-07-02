const restify = require('restify');
const restifyJWT = require('restify-jwt');
const server = restify.createServer();
const routes = require('./routes');
const port = 3000;

const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => {
    const key = 'jwt:secret';

    client.exists(key, (err, reply) => {
        if (err || reply === 0) {
            console.error('Cannot find JSON Web Token secret key');
        }
        if (reply === 1) {
            client.get(key, (error, secretKey) => {
                if (error) {
                    console.error('Cannot find JSON Web Token secret key');
                }
                server.use(restifyJWT({ secret: secretKey }));
                server.use(restify.fullResponse());
                server.use(restify.bodyParser());
                server.use(restify.queryParser());

                server.listen(port, (errors) => {
                    if (errors) {
                        console.error(errors);
                    }
                });

                routes(server);
            });
        }
    });
});

module.exports = server;
