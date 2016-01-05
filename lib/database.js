'use strict';
const mongo = require('mongodb').MongoClient;

const util = require('./util');

const mongoUrl = 'mongodb://' + process.env['DB_HOST'] + ':' + process.env['DB_PORT'] + '/' + process.env['DB_NAME'];

var database = {};

const fns = {};

const internals = {};

fns.insertOne = (data, collectionId) => {
    let collection = database.collection(collectionId);
    let now = new Date();
    data.create_date = now.toISOString();
    data.modified_date = now.toISOString();
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

    return util.safeObjectId(id, collectionId + '_id')
        .then(oId => {
            return collection
                .find({'_id': oId})
                .limit(-1)
                .batchSize(1)
                .toArray();
        });
};

fns.findMessagesByConversationId = (conversationId, query) => {
    let collection = database.collection('messages');
    return collection
        .find({conversation_id: conversationId})
        .limit(-query.elements)
        .skip(query.page * query.elements)
        .toArray();
};

fns.findLatestMessagesByDistinctConversation = (user_id, query) => {
    return new Promise((resolve, reject) => {

        let collectionMessages = database.collection('messages');
        let collectionConversations = database.collection('conversations');
        collectionConversations
            .find({'participants.user_id': user_id})
            .toArray((err, conversations) => {
                if (err) {
                    return reject(err);
                }
                let promises = conversations.map(con => {
                    return collectionMessages.find({
                            'conversation_id': con._id.toString()
                        })
                        .limit(-1)
                        .sort({timestamp: -1})
                        .toArray();
                });
                Promise.all(promises).then(results => {
                    let merged = [].concat.apply([], results);
                    merged.sort((a, b) => {
                        return b.timestamp - a.timestamp;
                    });
                    resolve(merged.slice(0, query.count || 3));
                }).catch(reject);
            });
    });
};

fns.acknowledgeConversation = (conversation_id, user_id, last_read) => {
    return util.safeObjectId(conversation_id, 'conversation_id')
        .then(objectId => {
            return database.collection('conversations')
                .findOneAndUpdate({
                    _id: objectId,
                    'participants.user_id': {$eq: user_id}
                }, {
                    $set: {
                        'participants.$.last_read': last_read
                    }
                });
        });
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


internals.isUserPartOfConversation = (conversationId, userId) => {
    return util.safeObjectId(conversationId, 'conversation_id')
        .then(oId => {
            return database.collection('conversations').find({
                '_id': oId,
                'participants.user_id': userId
            }).then(res => {
                return !!res.value;
            });
        });
};


module.exports = fns;