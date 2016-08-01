const Validator = require('../models/utils/validator');
const User = require('../models/user');
const Session = require('../models/session');

const config = require('../../../config');

let instance = null;

class AuthenticationController extends Validator {
    constructor() {
        super();
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    signInAction(data) {
        try {
            this.keysExist(data, ['email', 'password']);
            this.emailValid(data.email);
            return this._checkExistingUser(data);
        } catch (error) {
            return error;
        }
    }

    _checkExistingUser(data) {
        try {
            return new Promise((resolve, reject) => {
                var user = new User(data);
                user.signIn().then(() => {
                    resolve({userId: user.id, sessionHash: user.session.hash});
                }, reject);
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AuthenticationController();