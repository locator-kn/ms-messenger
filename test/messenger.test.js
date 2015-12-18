'use strict';
import test from 'ava';
const proxyquire =  require('proxyquire');

const databaseStub = require('./stubs/database.stub');
const messageFixtures = require('./fixture/messages');

const messages = proxyquire('../lib/messages', { './database': databaseStub });

test('messages.newTextMessage', t => {
    messages.newTextMessage(messageFixtures.textMessagePass, (err, data) => {
        t.is(null, err);
        t.is(data._id, '5673ee68d3f839675dc860ec');
    });
});

test('messages.newLocationMessage', t => {
    messages.newLocationMessage(messageFixtures.locationMessagePass, (err, data) => {
        t.is(null, err);
        t.is(data._id, '5673ee68d3f839675dc860ec');
    });
});