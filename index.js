'use strict';

const path = require('path');
const pwd = path.join(__dirname, '..', '/.env');
require('dotenv').config({path: pwd});

const seneca = require('seneca')();
const messages = require('./lib/messages');
const conversations = require('./lib/conversations');
const database = require('./lib/database');


// select desired transport method
const transportMethod = process.env['SENECA_TRANSPORT_METHOD'] || 'rabbitmq';
const patternPin = 'role:messenger';

// init database and then seneca and expose functions
database.connect()
    .then(() => {
        seneca
            .use(transportMethod + '-transport')
            .add(patternPin + ',cmd:newmessage,message_type:text', messages.newTextMessage)
            .add(patternPin + ',cmd:newmessage,message_type:location', messages.newLocationMessage)
            .add(patternPin + ',cmd:newconversation', conversations.newConversation)
            .add(patternPin + ',cmd:getconversationbyuser', conversations.getConversationsByUserId)
            //.act({
            //    role: 'messenger',
            //    cmd: 'getconversationbyuser',
            //    data: {
            //        'user_id': '11a2ae383bf25eefde31b13860842353'
            //    }
            //})
            .listen({type: transportMethod});
    });
