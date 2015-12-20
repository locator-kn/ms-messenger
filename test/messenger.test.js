'use strict';
import test from 'ava';
const proxyquire =  require('proxyquire');

const databaseStub = require('./stubs/database.stub');
const messageFixtures = require('./fixture/messages');
const conversationFixtures = require('./fixture/conversations');

const messages = proxyquire('../lib/messages', { './database': databaseStub });
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