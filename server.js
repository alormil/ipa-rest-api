// Including all required packages for server app
const restify = require('restify');
const restifyJWT = require('restify-jwt');
const server = restify.createServer();
const routes = require('./routes');
const port = 3000;

// We use redis in order to validate that secret JSON web token has been stored.
// If we find it, we will ensure that JWT validation is made for every API call.
const redis = require('redis');
const client = redis.createClient();

// A connection is made to the Redis server
client.on('connect', () => {
    const key = 'jwt:secret';

    // We validate if the redis key that contains the secret is present
    client.exists(key, (err, reply) => {
        // If Key is not found, return an error message
        if (err || reply === 0) {
            console.error('Cannot find JSON Web Token secret key');
        }
        // If key is found, we will retrieve the value and apply it on all API calls
        if (reply === 1) {
            client.get(key, (error, secretKey) => {
                if (error) {
                    console.error('Cannot find JSON Web Token secret key');
                }
                server.use(restifyJWT({ secret: secretKey }));
                server.use(restify.fullResponse());
                server.use(restify.bodyParser());
                server.use(restify.queryParser());

                // The server will be listening on Port 3000
                server.listen(port, (errors) => {
                    if (errors) {
                        console.error(errors);
                    }
                });

                // This will define the available routes that the server will handle
                routes(server);
            });
        }
    });
});

module.exports = server;
