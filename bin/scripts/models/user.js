const DatabaseConnector = require('./utils/database-connector');
const Encrypter = require('./utils/encrypter');
const BaseClass = require('./core/base-class');
const config = require('../../../config');

class UserClass extends BaseClass {
    constructor({email, password, isSuperAdmin}) {
        this.email = email;
        this.password = Encrypter.encryptPassword(password);
        this.isSuperAdmin = isSuperAdmin;
    }

    save() {
        return this.id ?
            DatabaseConnector.update(config.DATABASE_TABLES.USERS, this.serialize()) :
            DatabaseConnector.insert(config.DATABASE_TABLES.USERS, this.serialize());
    }

    signIn() {

    }
}

module.exports = UserClass;