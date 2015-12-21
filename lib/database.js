'use strict';
const mongo = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const mongoUrl = 'mongodb://' + process.env['DB_HOST'] + ':' + process.env['DB_PORT'] + '/' + process.env['DB_NAME'];

var database = {};

const fns = {};


fns.insertOne = (data, collectionId) => {
    let collection = database.collection(collectionId);
    return collection.insertOne(data);
};

fns.findConversationsByUser = (query) => {
    let collection = database.collection('conversations');
    return collection
        .find({'participants.user_id': query.user_id})
        .toArray();
};

fns.findById = (id, collectionId) => {
    let collection = database.collection(collectionId);
    return collection
        .find({'_id': new ObjectID(id)})
        .limit(-1)
        .batchSize(1)
        .toArray();
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