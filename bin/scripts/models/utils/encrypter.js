const Promise = require('promise');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let instance = null;

class EncrypterClass {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    encryptPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function(error, hash) {
                error ? reject(error) : resolve(hash);
            });
        });
    }

    isEqual(password, encryptedPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, encryptedPassword, function(error, result) {
                error ? reject() : resolve();
            });
        });
    }
}

module.exports = new EncrypterClass();