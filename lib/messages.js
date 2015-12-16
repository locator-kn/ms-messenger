'use strict';

const db = require('./database');

const fns = {};

fns.newMessage = (message, next) => {

    return db.getAllUsers(message)
        .then(data => {
            next(null, {doc: 'asd', processId: process.pid});
        }).catch(err => {
            return next({message: 'cmd was not test', code: 4000});
        });

};

module.exports = fns;