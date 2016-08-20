![alt text](https://codeship.com/projects/4f58b2d0-198e-0134-4a63-425fa58bd06d/status?branch=master "Codeship build status")
[![Dependency Status](https://gemnasium.com/badges/github.com/alormil/ipa-rest-api.svg)](https://gemnasium.com/github.com/alormil/ipa-rest-api)
[![Code Climate](https://codeclimate.com/github/alormil/ipa-rest-api/badges/gpa.svg)](https://codeclimate.com/github/alormil/ipa-rest-api)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/dcc5e6b267134cf487373bbd8d449719)](https://www.codacy.com/app/alormil/ipa-rest-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=alormil/ipa-rest-api&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/alormil/ipa-rest-api/badge.svg?branch=master)](https://coveralls.io/github/alormil/?branch=master)

# ipa-rest-api
International Phonetic Alphabet RESTful API for words

This project will consist of creating a REST API that will provide 2 things

- Return the International Phonetic Alphabet (IPA)
- Return the phonetic equivalent of a word

As a reference we will use the IPA Alphabet listed on wikipedia :

- https://en.wikipedia.org/wiki/Help:IPA_for_English
- https://en.wikipedia.org/wiki/Help:IPA_for_French

We will also use collinsdictionary.com in order to obtain the phonetic result of a word.

### How do I get set up? ###

1. Make sure you have Node JS installed (Download here: https://nodejs.org/en/download/current/)
2. Make sure you have Redis installed (Download here: http://redis.io/download)
3. Clone the repo into chosen directory and move to that directory
4. Run the following commands
```
npm install
redis-cli < data/alphabet_import.sh
```
5. Launch the Redis client using redis-cli and add a secret key that will be used for the JSON Web Tokens :
```
SET jwt:secret <enter secret key here>
```
6. Generate a JSON Web Token by running the following command with a desired email (This way you can restrict the API usage in order to prevent abuse)
```
scripts/token.js <enter email address>
```
The tokens and their information will be stored in redis, you can see the list of keys by accessing the set with name jwt:tokens.
7. Start the app server by running the following command :
```
node server.js
```
8. You can make API calls in order to retrieve information (Make sure that for the request Header name to use Authorization and place Bearer before the Token. ).

Some examples are :
```
GET localhost:3000/alphabet/fr
```
Which returns :
```
[
  {
    "IPA": "e",
    "Examples": "clé, les, chez, aller, pied, journée",
    "Type": "Oral vowels"
  },
  {
    "IPA": "s",
    "Examples": "sans, ça, assez",
    "Type": "Consonants"
  },
  {
    "IPA": "ˈ",
    "Examples": "moyen [mwaˈjɛ̃]",
    "Type": "Suprasegmentals"
  },
  ...
```
```
GET localhost:3000/ipa/fr/ordinateur
```
Which returns :
```
{
  "language": "fr",
  "word": "ordinateur",
  "phonetic": "ɔʀdinatœʀ"
}
```

For local development, if you don't want to perform points 1 & 2, I experimented with Otto as a development tool (You can download it here : https://www.ottoproject.io/downloads.html).
I was able to make the development environnment work following the following commands : https://github.com/hashicorp/otto/issues/496#issuecomment-230084747

Then if you ssh in the vagrant machine, you can basically execute the rest of the steps in the vagrant.

* Dependencies

All the package dependencies are located in package.json file

## Authors
Alain Lormil created the IPA Rest API.

## License
Copyright (c) 2015 Alain Lormil  
Licensed under the MIT license.
