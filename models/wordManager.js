const redis = require('redis');
const request = require('request');
const cheerio = require('cheerio');

exports.getPhonetic = (language, word, callback) => {
    // Get a Redis client from the connection pool
    const client = redis.createClient();

    // Connect to Redis Server
    client.on('connect', () => {
        // This is the hash that will be stored in Redis
        const key = `${language}:${word}`;

        // Check if the key is already present in redis
        // if the product is there already we skip it
        // Otherwise we store it in Redis
        client.exists(key, (err, reply) => {
            if (err) {
                return callback(err);
            }
            if (reply === 1) {
                console.log('Found Key in Redis');
                // After all data is returned, return results
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
