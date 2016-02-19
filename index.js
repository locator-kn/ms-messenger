'use strict';

const path = require('path');
const pwd = path.join(__dirname, '..', '/.env');
require('dotenv').config({path: pwd});

require('opbeat').start({
    appId: '575bf23680'
});

const seneca = require('seneca')();
const messages = require('./lib/messages');
const conversations = require('./lib/conversations');
const database = require('./lib/database');
const util = require('ms-utilities');

// select desired transport method
//const transportMethod = process.env['SENECA_TRANSPORT_METHOD'] || 'rabbitmq';
const patternPin = 'role:messenger';

// init database and then seneca and expose functions
database.connect()
    .then(() => {
        seneca
        //.use(transportMethod + '-transport')
            .client({type: 'tcp', port: 7010, host: 'localhost', pin: 'role:reporter'})

            .add(patternPin + ',cmd:newmessage,message_type:text', messages.newTextMessage)
            .add(patternPin + ',cmd:newmessage,message_type:location', messages.newLocationMessage)
            .add(patternPin + ',cmd:getmessagesbyconversationid', messages.getMessagesByConversationId)
            .add(patternPin + ',cmd:latestmessages,distict:conversation', messages.getLatestMessagesByDistinctConversation)
            .add(patternPin + ',cmd:newconversation', conversations.newConversation)
            .add(patternPin + ',cmd:getconversationsbyuser', conversations.getConversationsByUserId)
            .add(patternPin + ',cmd:getconversationbyid', conversations.getConversationById)
            .add(patternPin + ',cmd:ackConverstaion', conversations.ackConversation)
            //.act({
            //    role:'messenger',
            //    cmd:'newmessage',
            //    message_type: 'text',
            //    data: {
            //        message: '/giphy test',
            //        conversation_id: '56786fffbfef1e6033b62ed2',
            //        from: '56786fffbfef1e6033b62ed2'
            //    }
            //}, function(err, data) {
            //    console.log(err || data);
            //})
            .listen({type: 'tcp', port: 7003, pin: 'role:messenger'})
            .wrap(patternPin, util.reporter.report);


    });
