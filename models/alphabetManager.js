const redis = require('redis');

exports.getAlphabet = (language, callback) => {
    // Get a Redis client from the connection pool
    const client = redis.createClient();
    const result = [];

    // Connect to Redis Server
    client.on('connect', () => {
        // This is the hash that will be stored in Redis
        const hash = `${language}:alphabet`;

        // Check if the key is already present in redis
        // if the product is there already we skip it
        // Otherwise we store it in Redis
        client.exists(hash, (err, reply) => {
            if (err) {
                return callback(err);
            }
            if (reply === 1) {
                // After all data is returned, return results
                client.smembers(hash, (error, letters) => {
                    if (error) {
                        return callback(error);
                    }
                    Object.keys(letters).forEach((index) => {
                        client.hgetall(`${letters[index]}`, (error2, object) => {
                            result.push(JSON.stringify(object));
                            if (letters.length === result.length) {
                                return callback(null, result);
                            }
                        });
                    });
                });
            }
            if (reply === 0) {
                console.log('Alphabet not found');
                return callback(null);
            }
        });
    });
};
