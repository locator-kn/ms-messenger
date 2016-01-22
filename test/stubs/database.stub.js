'use strict';

const fns = {};
const conversationFixtures = require('../fixture/conversations');
const messageFixtures = require('../fixture/messages');

const util = require('ms-utilities');

fns.insertOne = (message) => {
    if (message.participants && message.participants.length) {
        message._id = '5673ee68d3f839675dc860ec';
        return Promise.resolve(message);
    }
    return Promise.resolve({insertedId: '5673ee68d3f839675dc860ec'});
};


fns.findConversationsByUser = (query) => {
    if (conversationFixtures.conversationsUserId.data.user_id !== query.user_id) {
        return Promise.resolve([]);
    }
    return Promise.resolve(conversationFixtures.getConversationsResponse);
};


fns.findById = (id) => {
    if(conversationFixtures.getConversationByIdResponse._id === id) {

        return Promise.resolve([conversationFixtures.getConversationByIdResponse]);
    } else {
        return Promise.resolve([]);
    }
};


fns.countByIds = (ids, collectionId) => {
    if(!collectionId) {
        return Promise.reject();
    }
    let promises = ids.map(id => util.safeObjectId(id, collectionId + '_id'));

    return Promise.all(promises)
        .then(oIds => oIds.length);
};

fns.findMessagesByConversationId = (id) => {
    if(messageFixtures.messagesByConversationIdQuery.data.conversation_id === id) {
        return Promise.resolve([conversationFixtures.getConversationByIdResponse]);
    } else {
        return Promise.resolve([]);
    }
};


fns.findLatestMessagesByDistinctConversation = (user_id) => {
    if(messageFixtures.latestMessagesWithCountQuery.data.user_id === user_id) {

        return Promise.resolve(messageFixtures.latestMessagesWithCountResponse);
    } else {
        return Promise.resolve([]);
    }
};

fns.acknowledgeConversation = (conversationId) => {
    return util.safeObjectId(conversationId, 'conversation_id')
        .then(() => {
            if(conversationId === conversationFixtures.ackConversation.data.conversation_id) {
                return {value:'something'};
            }
            return [];
        });
};


module.exports = fns;