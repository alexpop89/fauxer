const DatabaseConnector = require('./utils/database-connector');
const config = require('../../../config');

class UserClass {
    constructor({email, password}) {
        this.email = email;
        this.password = password;
    }

    save() {
        var data = {
            email: this.email,
            password: this.password
        };


        return this.id ? DatabaseConnector.insert(config.DATABASE_TABLES.USERS, data) : DatabaseConnector.insert(config.DATABASE_TABLES.USERS, data);
    }
}

module.exports = UserClass;