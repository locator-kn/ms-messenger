'use strict';

const fixtures = {};

fixtures.twoParticipants = {
    role: 'messenger',
    cmd: 'newconversation',
    data: {
        participants: [{
            'user_id': '11a2ae383bf25eefde31b13860842353',
            last_read: 123123123
        }, {
            'user_id': '11a2ae383bf25eefde31b13860842353'
        }]
    }
};

fixtures.twoParticipantsMissingUserId = {
    role: 'messenger',
    cmd: 'newconversation',
    data: {
        participants: [{
            last_read: 123123123
        }, {
            'user_id': '11a2ae383bf25eefde31b13860842353'
        }]
    }
};


module.exports = fixtures;