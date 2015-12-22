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
            //.use(transportMethod + '-transport')
            .add(patternPin + ',cmd:newmessage,message_type:text', messages.newTextMessage)
            .add(patternPin + ',cmd:newmessage,message_type:location', messages.newLocationMessage)
            .add(patternPin + ',cmd:getmessagesbyconversationid', messages.getMessagesByConversationId)
            .add(patternPin + ',cmd:latestmessages,distict:conversation', messages.getLatestMessagesByDistinctConversation)
            .add(patternPin + ',cmd:newconversation', conversations.newConversation)
            .add(patternPin + ',cmd:getconversationsbyuser', conversations.getConversationsByUserId)
            .add(patternPin + ',cmd:getconversationbyid', conversations.getConversationById)
            /*.act({
                role: 'messenger',
                cmd: 'latestmessages',
                distict: 'conversation',
                data: {
                    'user_id': '567857f5de1d4c5a4fd81d03',
                    'query': {
                        count: 3
                    }
                }
            }, function() {
                console.log(JSON.stringify(arguments[1]));
            })*/
            .listen({type: 'tcp', port: 7003, pin: 'role:messenger'});
    });
