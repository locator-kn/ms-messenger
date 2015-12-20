'use strict';

const fns = {};
const conversationFixtures = require('../fixture/conversations');

fns.insertOne = (message, collection) => {
    if (message.participants && message.participants.length) {
        message._id = '5673ee68d3f839675dc860ec';
        return Promise.resolve(message);
    }
    return Promise.resolve({insertedId: '5673ee68d3f839675dc860ec'});
};


fns.findConversationsByUser = (query) => {
    if (!conversationFixtures.conversationsUserId.data.user_id === query.user_id) {
        return Promise.resolve([]);
    }
    return Promise.resolve(conversationFixtures.getConversationsResponse);
};


fns.findById = (id, collectionId) => {
    console.log(id, conversationFixtures.getConversationByIdResponse._id);
    if(conversationFixtures.getConversationByIdResponse._id === id) {

        return Promise.resolve([conversationFixtures.getConversationByIdResponse]);
    } else {
        return Promise.resolve([]);
    }
};


module.exports = fns;