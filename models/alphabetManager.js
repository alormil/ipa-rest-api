const redis = require('redis');

exports.getAlphabet = (language, callback) => {
    // Get a Redis client from the connection pool
    const client = redis.createClient();
    const result = [];

    // Connect to Redis Server
    client.on('connect', () => {
        // This is the key is stored in Redis containing alphabet
        const key = `${language}:alphabet`;

        // Check if the alphabet key is present in Redis
        client.exists(key, (err, reply) => {
            // If error occurs, return error
            if (err) {
                return callback(err);
            }
            // If Key is present, loop through all members & return result as JSON object
            if (reply === 1) {
                client.smembers(key, (error, letters) => {
                    if (error) {
                        return callback(error);
                    }
                    Object.keys(letters).forEach((index) => {
                        client.hgetall(`${letters[index]}`, (error2, object) => {
                            result.push(JSON.parse(JSON.stringify(object)));
                            if (letters.length === result.length) {
                                return callback(null, result);
                            }
                        });
                    });
                });
            }
            // If key is not present return nothing
            if (reply === 0) {
                return callback(null);
            }
        });
    });
};
