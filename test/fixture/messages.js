'use strict';

const fixtures = {};

fixtures.locationMessagePass = {
    role: 'messenger',
    cmd: 'newmessage',
    message_type: 'location',
    data: {
        'location_id': 'abc123',
        'conversation_id': '012bb2568b1842959293402b06b42170',
        'from': '012bb2568b1842959293402b06b3681b'
    }
};

fixtures.textMessagePass = {
    role: 'messenger',
    cmd: 'newmessage',
    message_type: 'text',
    data: {
        'message': 'abc123',
        'conversation_id': '012bb2568b1842959293402b06b42170',
        'from': '012bb2568b1842959293402b06b3681b'
    }
};

fixtures.messagesByConversationIdQuery = {
    role: 'messenger',
    cmd: 'getmessagesbyconversationid',
    data: {
        'conversation_id': '012bb2568b1842959293402b06b42170'
    }
};

fixtures.latestMessagesWithCountQuery = {
    role: 'messenger',
    cmd: 'latestmessages',
    distict: 'conversation',
    data: {
        'user_id': '567857f5de1d4c5a4fd81d03',
        'query': {
            count: 3
        }
    }
};

fixtures.latestMessagesWithCountResponse = [
    {
        '_id': '56787008d7acf66f332682a6',
        'conversation_id': '56786fffbfef1e6033b62ed6',
        'from': '56786fe3522786413366397a',
        'message': 'was geht?',
        'timestamp': 1447892770331,
        'modified_date': '2015-11-19T00:26:10.331Z',
        'message_type': 'text'
    },
    {
        '_id': '56787008d7acf66f332682a0',
        'conversation_id': '56786fffbfef1e6033b62ed2',
        'from': '56786fe3522786413366397a',
        'message': 'hshsbdbd',
        'timestamp': 1447691527963,
        'modified_date': '2015-11-16T16:32:07.964Z',
        'message_type': 'text'
    },
    {
        '_id': '56787008d7acf66f33268507',
        'conversation_id': '56786fffbfef1e6033b62ee2',
        'from': '56786fe3522786413366397a',
        'message': 'qkaksak',
        'timestamp': 1442015090970,
        'modified_date': '2015-09-11T23:44:50.970Z',
        'message_type': 'text'
    }];

module.exports = fixtures;