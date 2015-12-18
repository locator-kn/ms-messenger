'use strict';
import test from 'ava';
const proxyquire =  require('proxyquire');

const databaseStub = require('./stubs/database.stub');
const messages = proxyquire('../lib/messages', { './database': databaseStub });

test('module.newTextMessage', t => {
    messages.newTextMessage({
        role: 'messenger',
        cmd: 'newmessage',
        message_type: 'text',
        data: {
            'message': 'abc123',
            'conversation_id': '012bb2568b1842959293402b06b42170',
            'from': '012bb2568b1842959293402b06b3681b'
        }
    }, (err, data) => {
        if(err) {
            return t.fail();
        }
        t.pass();
    });
});

test('module.newLocationMessage', t => {
    messages.newLocationMessage({
        role: 'messenger',
        cmd: 'newmessage',
        message_type: 'location',
        data: {
            'location_id': 'abc123',
            'conversation_id': '012bb2568b1842959293402b06b42170',
            'from': '012bb2568b1842959293402b06b3681b'
        }
    }, (err, data) => {
        if(err) {
            return t.fail();
        }

        t.ok(data);
    });
});