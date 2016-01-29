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
    messages.newTextMessage(messageFixtures.textMessagePass, (err, data) => {
        t.is(null, err);
        t.is(data._id, '5673ee68d3f839675dc860ec');
    });
});

test('messages.newTextMessage with location message', t => {
    messages.newTextMessage(messageFixtures.locationMessagePass, (err, data) => {
        t.is('ValidationError', err.name);
        t.is(void 0, data);
    });
});

test('messages.newLocationMessage', t => {
    messages.newLocationMessage(messageFixtures.locationMessagePass, (err, data) => {
        t.is(null, err);
        t.is(data._id, '5673ee68d3f839675dc860ec');
    });
});

test('messages.newLocationMessage with text message', t => {
    messages.newLocationMessage(messageFixtures.textMessagePass, (err, data) => {
        t.is('ValidationError', err.name);
        t.is(void 0, data);
    });
});


test('messages.getMessagesByConversationId', t => {
    messages.getMessagesByConversationId(messageFixtures.messagesByConversationIdQuery, (err) => {
        t.notOk(err);
    });
});

test('messages.getMessagesByConversationId with random query', t => {
    messages.getMessagesByConversationId(messageFixtures.textMessagePass, (err, data) => {
        t.is('ValidationError', err.name);
        t.is(void 0, data);
    });
});


test('messages.getLatestMessagesByDistinctConversation with query', t => {
    messages.getLatestMessagesByDistinctConversation(messageFixtures.latestMessagesWithCountQuery, (err, data) => {
        t.notOk(err);

        t.is(messageFixtures.latestMessagesWithCountQuery.data.query.count, data.length);
        t.true(data[0].timestamp > data[1].timestamp);
        t.true(data[0].timestamp > data[data.length - 1].timestamp);
    });
});


test('messages.getLatestMessagesByDistinctConversation without query', t => {
    let latest = Hoek.clone(messageFixtures.latestMessagesWithCountQuery);
    delete latest.data.query;
    messages.getLatestMessagesByDistinctConversation(latest, (err, data) => {
        t.notOk(err);

        t.is(3, data.length);
        t.true(data[0].timestamp > data[1].timestamp);
        t.true(data[0].timestamp > data[data.length - 1].timestamp);
    });
});


test('messages.getLatestMessagesByDistinctConversation with invalid query', t => {
    messages.getLatestMessagesByDistinctConversation({data: {}}, (err) => {
        t.ok(err);
        t.is(err.name, 'ValidationError');

    });
});

// Conversations

test('conversations.newConversation with 2 participants', t => {
    conversations.newConversation(conversationFixtures.twoParticipants, (err, data) => {
        let expected = conversationFixtures.twoParticipants.data;
        expected.participants[1].last_read = 0;
        expected._id = '5673ee68d3f839675dc860ec';
        t.notOk(err);
        t.ok(data);
        t.same(expected, data);
    });
});

test('conversations.newConversation with 2 participants but missing user_id', t => {
    conversations.newConversation(conversationFixtures.twoParticipantsMissingUserId, (err, data) => {

        t.is('ValidationError', err.name);
        t.is(void 0, data);
    });
});

test('conversations.getConversationsByUserId with valid user_id', t => {
    conversations.getConversationsByUserId(conversationFixtures.conversationsUserId, (err, data) => {

        t.notOk(err);
        t.is(data.length, conversationFixtures.getConversationsResponse.length);
    });
});

test('conversations.getConversationsByUserId with invalid user_id', t => {
    conversations.getConversationsByUserId({data: {wrong_key: 'guga'}}, (err, data) => {

        t.is('ValidationError', err.name);
        t.is(void 0, data);
    });
});

test('conversations.getConversationById with valid conversation_id', t => {
    conversations.getConversationById(conversationFixtures.getConversationByIdWithResult, (err, data) => {
        t.is(conversationFixtures.getConversationByIdWithResult.data.conversation_id, data._id);
    });
});

test('conversations.getConversationById with invalid conversation_id', t => {
    conversations.getConversationById(conversationFixtures.getConversationByIdWithNoResult, (err, data) => {
        t.is('not found', err.message);
        t.is(void 0, data);
    });
});

test('conversations.getConversationById with crappy data', t => {
    conversations.getConversationById({data: {crappy: 'data'}}, (err, data) => {
        t.is('ValidationError', err.name);
        t.is(void 0, data);
    });
});

test('conversations.ackConversation with valid conversation_id', t => {
    conversations.ackConversation(conversationFixtures.ackConversation, (err, data) => {
        t.is(null, err);
        t.is('something', data);
    });
});


test('conversations.ackConversation with invalid conversation_id', t => {
    conversations.ackConversation(conversationFixtures.ackConversationInvalidConversationId, (err, data) => {
        t.is('Error', err.name);
        t.is('Invalid conversation_id', err.message);
        t.is(void 0, data);
    });
});


test('conversations.ackConversation with invalid schema', t => {
    conversations.ackConversation(conversationFixtures.conversationsUserId, (err, data) => {
        t.is('ValidationError', err.name);
        t.is(void 0, data);
    });
});

test('conversations.ackConversation not found', t => {
    conversations.ackConversation(conversationFixtures.ackConversationNotFound, (err, data) => {
        t.is('Error', err.name);
        t.is('not found', err.message);
        t.is(void 0, data);
    });
});
