const SessionController = require('../../controllers/session');

let instance = null;

class MiddlewareClass {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    validateSession(request, response, next) {
        if (request.session.sessionHash && request.session.userId) {
            SessionController.checkSession(request.session.userId, request.session.sessionHash).then(() => {
                next();
            }, err => {
                throw new Error(err);
            });
        }
    }
}

module.exports = new MiddlewareClass();