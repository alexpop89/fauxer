const SessionClass = require('../models/session');

let instance = null;

class SessionController {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    checkSession(userId, sessionHash) {
        var session = new SessionClass({user: userId, hash: sessionHash});
        return session.checkSessionAvailability();
    }
}

module.exports = new SessionController();