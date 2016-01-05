'use strict';
const mongo = require('mongodb').MongoClient;

const util = require('./util');

const mongoUrl = 'mongodb://' + process.env['DB_HOST'] + ':' + process.env['DB_PORT'] + '/' + process.env['DB_NAME'];

var database = {};

const fns = {};

const internals = {};

const c = {
    CONVERSATIONS: 'conversations',
    MESSAGES: 'messages'
};

fns.insertOne = (data, collectionId) => {
    let collection = database.collection(collectionId);
    let now = new Date();
    data.create_date = now.toISOString();
    data.modified_date = now.toISOString();
    return collection.insertOne(data);
};

fns.findConversationsByUser = (query) => {
    let collection = database.collection(c.CONVERSATIONS);
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
    let collection = database.collection(c.MESSAGES);
    return collection
        .find({conversation_id: conversationId})
        .limit(-query.elements)
        .skip(query.page * query.elements)
        .toArray();
};

fns.findLatestMessagesByDistinctConversation = (userId, query) => {
    return new Promise((resolve, reject) => {

        let collectionMessages = database.collection(c.MESSAGES);
        let collectionConversations = database.collection(c.CONVERSATIONS);
        collectionConversations
            .find({'participants.user_id': userId})
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

fns.acknowledgeConversation = (conversationId, userId, lastRead) => {
    return util.safeObjectId(conversationId, 'conversation_id')
        .then(objectId => {
            return database.collection(c.CONVERSATIONS)
                .findOneAndUpdate({
                    _id: objectId,
                    'participants.user_id': {$eq: userId}
                }, {
                    $set: {
                        'participants.$.last_read': lastRead
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
            return database.collection(c.CONVERSATIONS)
                .find({
                    '_id': oId,
                    'participants.user_id': userId
                })
                .limit(-1)
                .batchSize(1)
                .toArray()
                .then(res => {
                    return !!res[0];
                });
        });
};


module.exports = fns;