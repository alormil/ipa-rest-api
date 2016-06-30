const redis = require('redis');

exports.getAlphabet = (callback) => {
    // Get a Redis client from the connection pool
    const client = redis.createClient();

    // Connect to Redis Server
    client.on('connect', () => {
        // This is the hash that will be stored in Redis
        const hash = 'fr:alphabet';

        // Check if the key is already present in redis
        // if the product is there already we skip it
        // Otherwise we store it in Redis
        client.exists(hash, (err, reply) => {
            if (err) {
                return callback(err);
            }
            if (reply === 1) {
                console.log('Found Key in Redis');
                // After all data is returned, return results
                client.smembers(hash, (error, members) => {
                    if (error) {
                        return callback(error);
                    }
                    console.log(members);
                    return callback(null, members);
                });
                return callback(null, 'Found Key in Redis');
            }
            if (reply === 0) {
                console.log('Alphabet not found');
                return callback(null);
            }
            return callback(null);
        });
    });
};
