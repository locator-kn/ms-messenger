'use strict';
import test from 'ava';
const proxyquire =  require('proxyquire');

const databaseStub = require('./stubs/database.stub');
const messages = proxyquire('../lib/messages', { './database': databaseStub });

test('module.newMessage', t => {
    //messages.newMessage({cmd: 'test', bla: 'test'}, (err, data) => {
    //    if(err) {
    //        return t.fail();
    //    }
    //    t.pass();
    //});
});