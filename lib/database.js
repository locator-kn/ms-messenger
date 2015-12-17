'use strict';
const mongo = require('mongodb').MongoClient;

const mongoUrl = 'mongodb://' + process.env['DB_HOST'] + ':' + process.env['DB_PORT'] + '/' + process.env['DB_NAME'];

var database = {};

const fns = {};


fns.addNewMessage = (message) => {
    let collection = database.collection('messages');
    return collection.insertOne(message);
};

/**
 * connects to the database
 * @returns {Promise|*}
 */
fns.connect = () => {
    console.log('open database', mongoUrl);
    return mongo.connect(mongoUrl)
        .then(db => {
            console.log('database successfully connected');
            database = db;
        })
        .catch(err => {
            console.error('unable to connect to database', err);
        });
};


module.exports = fns;