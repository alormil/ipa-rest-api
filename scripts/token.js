// Import packages need for script
const jwt = require('jsonwebtoken');
const redis = require('redis');

// We expect from the command line that the second parameter passed will be an email
// Eg. node data/token.js test@gmail.com
if (process.argv[2] !== null && process.argv.length > 2) {
    const client = redis.createClient();
    const email = process.argv[2];

    // Connect to Redis Server
    client.on('connect', () => {
        const key = 'jwt:secret';

        // We validate if the redis key that contains the secret is present
        client.exists(key, (err, reply) => {
            // If Key is not found, return an error message
            if (err || reply === 0) {
                console.error('Cannot find JSON Web Token secret key');
            }
            // If key is found, we will retrieve the value and use it to generate token
            if (reply === 1) {
                client.get(key, (error, secret) => {
                    if (error) {
                        console.error('Cannot find JSON Web Token secret key');
                    }
                    // Set expiry time for each token generate
                    const expiresIn = {
                        expiresIn: '1d',
                    };
                    // Set email as information that will be used in token
                    const profile = {
                        usrEmail: email,
                    };
                    // Use jsonwebtoken package to create a new token
                    const token = jwt.sign(profile, secret, expiresIn);
                    console.log(`Please use this token: ${token}`);

                    // Count how many tokens have been generated in order to add it list
                    client.scard('jwt:tokens', (errors, numberOfTokes) => {
                        if (errors) {
                            console.error('Cannot add token to Redis');
                        }
                        // Add token to the list of tokens
                        client.sadd('jwt:tokens', `jwt:token:${numberOfTokes}`);
                        // Create hash that contains  relevant information of the token :
                        // Email, token & expiry date
                        const expireDate = new Date(Date.now() + 86400000);
                        client.hmset(`jwt:token:${numberOfTokes}`,
                            'email', email,
                            'token', token,
                            'expiryDate', expireDate.toISOString());
                    });
                });
            }
        });
    });
} else {
    // If no parameters are passed return error message
    console.error('Please specify an email in order to generate token');
}
