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

module.exports = fixtures;