let config = require('../../../../config');

class Validator {
    keysExist(data, keysArray) {
        var allKeysExist = true;

        for (let index = 0; index < keysArray.length; index += 1 in keysArray) {
            allKeysExist = data[keysArray[index]] ? allKeysExist : false;
        }

        if (!allKeysExist) {
            throw new Error(config.ERRORS.MISSING_FIELDS);
        }
    }

    emailValid(emailString) {
        var validEmail = true;

        if (!validEmail) {
            throw new Error(config.ERRORS.INVALID_EMAIL);
        }
    }

    passwordValid(passwordString) {

    }
}

module.exports = Validator;