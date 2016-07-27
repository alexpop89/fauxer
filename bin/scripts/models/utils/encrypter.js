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
        var encryptedPassword;
        bcrypt.hash(password, saltRounds, function(error, hash) {
            encryptedPassword = hash;
        });

        return encryptedPassword;
    }

    isEqual(password, encryptedPassword) {
        var isEqual = false;
        bcrypt.compare(password, encryptedPassword, function(error, result) {
            isEqual = !!result;
        });

        return isEqual;
    }
}

module.exports = new EncrypterClass()