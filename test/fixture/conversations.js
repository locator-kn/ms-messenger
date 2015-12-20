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

fixtures.conversationsUserId = {
    data: {
        user_id: '11a2ae383bf25eefde31b13860842353'
    },
    cmd: 'getconversationbyuser',
    role: 'messenger'
};

fixtures.getConversationsResponse = [{
    '_id': '11a2ae383bf25eefde31b138608424ad',
    'create_date': '2015-07-30T19:31:45.740Z',
    'modified_date': '2015-07-30T19:32:15.864Z',
    'participants': [{'user_id': 'locator-app', 'last_read': 0}, {
        'user_id': '11a2ae383bf25eefde31b13860842353',
        'last_read': 0
    }]
}, {
    '_id': '5676d94b36519ae50789705b',
    'participants': [{
        'user_id': '11a2ae383bf25eefde31b13860842353',
        'last_read': 123123123
    }, {'user_id': '11a2ae383bf25eefde31b13860842353', 'last_read': 0}]
}, {
    '_id': '5676d94b214c73e4078408a1',
    'participants': [{
        'user_id': '11a2ae383bf25eefde31b13860842353',
        'last_read': 123123123
    }, {'user_id': '11a2ae383bf25eefde31b13860842353', 'last_read': 0}]
}, {
    '_id': '5676d9bc24d8d35f0824af79',
    'participants': [{
        'user_id': '11a2ae383bf25eefde31b13860842353',
        'last_read': 123123123
    }, {'user_id': '11a2ae383bf25eefde31b13860842353', 'last_read': 0}]
}, {
    '_id': '5676d9bc4144f360085f0fa8',
    'participants': [{
        'user_id': '11a2ae383bf25eefde31b13860842353',
        'last_read': 123123123
    }, {'user_id': '11a2ae383bf25eefde31b13860842353', 'last_read': 0}]
}];


fixtures.getConversationByIdWithResult = {
    role: 'messenger',
    cmd: 'getconversationbyid',
    data: {
        'conversation_id': '11a2ae383bf25eefde31b138608424ad'
    }
};
fixtures.getConversationByIdWithNoResult = {
    role: 'messenger',
    cmd: 'getconversationbyid',
    data: {
        'conversation_id': 'qwertz'
    }
};

fixtures.getConversationByIdResponse = {
    '_id': '11a2ae383bf25eefde31b138608424ad',
    'create_date': '2015-07-30T19:31:45.740Z',
    'modified_date': '2015-07-30T19:32:15.864Z',
    'participants': [{'user_id': 'locator-app', 'last_read': 0}, {
        'user_id': '11a2ae383bf25eefde31b13860842353',
        'last_read': 0
    }]
};


module.exports = fixtures;