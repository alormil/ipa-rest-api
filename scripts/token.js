const jwt = require('jsonwebtoken');
const redis = require('redis');

if (process.argv[2] !== null && process.argv.length > 2) {
    const client = redis.createClient();
    const email = process.argv[2];

    // Connect to Redis Server
    client.on('connect', () => {
        const key = 'jwt:secret';

        client.exists(key, (err, reply) => {
            if (err || reply === 0) {
                console.error('Cannot find JSON Web Token secret key');
            }
            if (reply === 1) {
                client.get(key, (error, secret) => {
                    if (error) {
                        console.error('Cannot find JSON Web Token secret key');
                    }
                    const expiresIn = {
                        expiresIn: '1d',
                    };
                    const profile = {
                        usrEmail: email,
                    };
                    const token = jwt.sign(profile, secret, expiresIn);
                    console.log(`Please use this token: ${token}`);

                    client.scard('jwt:tokens', (errors, numberOfTokes) => {
                        if (errors) {
                            console.error('Cannot add token to Redis');
                        }
                        client.sadd('jwt:tokens', `jwt:token:${numberOfTokes}`);
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
    console.error('Please specify an email in order to generate token');
}
