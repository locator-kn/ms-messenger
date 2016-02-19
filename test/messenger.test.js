'use strict';
import test from 'ava';
const proxyquire =  require('proxyquire');
const Hoek = require('hoek');

const databaseStub = require('./stubs/database.stub');
const messagesHelperStub = require('./stubs/messagesHelper.stub');
const messageFixtures = require('./fixture/messages');
const conversationFixtures = require('./fixture/conversations');

const messages = proxyquire('../lib/messages', { './database': databaseStub, './helper': messagesHelperStub });
const conversations = proxyquire('../lib/conversations', { './database': databaseStub });

test('messages.newTextMessage', t => {
    messages.newTextMessage(messageFixtures.textMessagePass, (err, responseData) => {
        t.is(null, err);
        t.is(responseData._id, '5673ee68d3f839675dc860ec');
    });
});

test('messages.newTextMessage with location message', t => {
    messages.newTextMessage(messageFixtures.locationMessagePass, (err, responseData) => {
        t.is('ValidationError', err.name);
        t.is(void 0, responseData);
    });
});

test('messages.newLocationMessage', t => {
    messages.newLocationMessage(messageFixtures.locationMessagePass, (err, responseData) => {
        t.is(null, err);
        t.is(responseData._id, '5673ee68d3f839675dc860ec');
    });
});

test('messages.newLocationMessage with text message', t => {
    messages.newLocationMessage(messageFixtures.textMessagePass, (err, responseData) => {
        t.is('ValidationError', err.name);
        t.is(void 0, responseData);
    });
});


test('messages.getMessagesByConversationId', t => {
    messages.getMessagesByConversationId(messageFixtures.messagesByConversationIdQuery, (err) => {
        t.notOk(err);
    });
});

test('messages.getMessagesByConversationId with random query', t => {
    messages.getMessagesByConversationId(messageFixtures.textMessagePass, (err, responseData) => {
        t.is('ValidationError', err.name);
        t.is(void 0, responseData);
    });
});


test('messages.getLatestMessagesByDistinctConversation with query', t => {
    messages.getLatestMessagesByDistinctConversation(messageFixtures.latestMessagesWithCountQuery, (err, responseData) => {
        t.notOk(err);

        t.is(messageFixtures.latestMessagesWithCountQuery.responseData.query.count, responseData.length);
        t.true(responseData[0].timestamp > responseData[1].timestamp);
        t.true(responseData[0].timestamp > responseData[responseData.length - 1].timestamp);
    });
});


test('messages.getLatestMessagesByDistinctConversation without query', t => {
    let latest = Hoek.clone(messageFixtures.latestMessagesWithCountQuery);
    delete latest.responseData.query;
    messages.getLatestMessagesByDistinctConversation(latest, (err, responseData) => {
        t.notOk(err);

        t.is(3, responseData.length);
        t.true(responseData[0].timestamp > responseData[1].timestamp);
        t.true(responseData[0].timestamp > responseData[responseData.length - 1].timestamp);
    });
});


test('messages.getLatestMessagesByDistinctConversation with invalid query', t => {
    messages.getLatestMessagesByDistinctConversation({responseData: {}}, (err) => {
        t.ok(err);
        t.is(err.name, 'ValidationError');

    });
});

// Conversations

test('conversations.newConversation with 2 participants', t => {
    conversations.newConversation(conversationFixtures.twoParticipants, (err, responseData) => {
        let expected = conversationFixtures.twoParticipants.responseData;
        expected.participants[1].last_read = 0;
        expected._id = '5673ee68d3f839675dc860ec';
        t.notOk(err);
        t.ok(responseData);
        t.same(expected, responseData);
    });
});

test('conversations.newConversation with 2 participants but missing user_id', t => {
    conversations.newConversation(conversationFixtures.twoParticipantsMissingUserId, (err, responseData) => {

        t.is('ValidationError', err.name);
        t.is(void 0, responseData);
    });
});

test('conversations.getConversationsByUserId with valid user_id', t => {
    conversations.getConversationsByUserId(conversationFixtures.conversationsUserId, (err, responseData) => {

        t.notOk(err);
        t.is(responseData.length, conversationFixtures.getConversationsResponse.length);
    });
});

test('conversations.getConversationsByUserId with invalid user_id', t => {
    conversations.getConversationsByUserId({responseData: {wrong_key: 'guga'}}, (err, responseData) => {

        t.is('ValidationError', err.name);
        t.is(void 0, responseData);
    });
});

test('conversations.getConversationById with valid conversation_id', t => {
    conversations.getConversationById(conversationFixtures.getConversationByIdWithResult, (err, responseData) => {
        t.is(conversationFixtures.getConversationByIdWithResult.responseData.conversation_id, responseData._id);
    });
});

test('conversations.getConversationById with invalid conversation_id', t => {
    conversations.getConversationById(conversationFixtures.getConversationByIdWithNoResult, (err, responseData) => {
        t.is('not found', err.message);
        t.is(void 0, responseData);
    });
});

test('conversations.getConversationById with crappy responseData', t => {
    conversations.getConversationById({responseData: {crappy: 'responseData'}}, (err, responseData) => {
        t.is('ValidationError', err.name);
        t.is(void 0, responseData);
    });
});

test('conversations.ackConversation with valid conversation_id', t => {
    conversations.ackConversation(conversationFixtures.ackConversation, (err, responseData) => {
        t.is(null, err);
        t.is('something', responseData);
    });
});


test('conversations.ackConversation with invalid conversation_id', t => {
    conversations.ackConversation(conversationFixtures.ackConversationInvalidConversationId, (err, responseData) => {
        t.is('Error', err.name);
        t.is('Invalid conversation_id', err.message);
        t.is(void 0, responseData);
    });
});


test('conversations.ackConversation with invalid schema', t => {
    conversations.ackConversation(conversationFixtures.conversationsUserId, (err, responseData) => {
        t.is('ValidationError', err.name);
        t.is(void 0, responseData);
    });
});

test('conversations.ackConversation not found', t => {
    conversations.ackConversation(conversationFixtures.ackConversationNotFound, (err, responseData) => {
        t.is('Error', err.name);
        t.is('not found', err.message);
        t.is(void 0, responseData);
    });
});
