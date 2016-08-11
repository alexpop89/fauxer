let config = require('../../../../config');

class Validator {
    keysExist(data, keysArray) {
        let allKeysExist = true;

        for (let index = 0; index < keysArray.length; index += 1 in keysArray) {
            allKeysExist = data[keysArray[index]] ? allKeysExist : false;
        }

        if (!allKeysExist) {
            throw new Error(config.ERRORS.MISSING_FIELDS);
        }
    }

    emailValid(emailString) {
        let validEmail = true;

        if (!validEmail) {
            throw new Error(config.ERRORS.INVALID_EMAIL);
        }
    }

    containsLetters(string) {
        try {
            return string.match(/[a-z]/i).index > -1;
        } catch (ignore) {
            return false;
        }

    }

    passwordValid(passwordString) {

    }
}

module.exports = Validator;