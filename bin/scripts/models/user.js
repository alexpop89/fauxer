const DatabaseConnector = require('./utils/database-connector');
const Encrypter = require('./utils/encrypter');
const BaseClass = require('./core/base-class');
const SessionClass = require('./session');
const config = require('../../../config');

class UserClass extends BaseClass {
    constructor({id, email, password, isSuperAdmin}) {
        super();

        this.id = id;
        this.password = password;
        this.email = email;
        this.isSuperAdmin = isSuperAdmin;
        this.session = null;

        this._excludedProperties = ['session'];
    }

    save() {
        return DatabaseConnector.find(config.DATABASE_TABLES.USERS, ['*'], {email: this.email}).then(rows => {
            if (rows && rows[0]) {
                return DatabaseConnector.update(config.DATABASE_TABLES.USERS, this.serialize(), {id: parseInt(rows[0].id, 10)});
            } else {
                return DatabaseConnector.insert(config.DATABASE_TABLES.USERS, this.serialize());
            }
        });
    }

    signIn() {
        var data = {
            email: this.email
        };

        return new Promise((resolve, reject) => {
            DatabaseConnector.find(config.DATABASE_TABLES.USERS, ['*'], data).then(rows => {
                if (rows && rows[0]) {
                    var userPassword = rows[0].password;
                    Encrypter.isEqual(this.password, userPassword).then(() => {
                        this.id = rows[0].id;
                        this.password = rows[0].password;
                        this.isSuperAdmin = rows[0].isSuperAdmin;
                        this.email = rows[0].email;

                        this.session = new SessionClass({user: this.id});
                        this.session.save().then(resolve, reject);
                    });
                } else {
                    reject();
                }
            }, reject);
        });
    }
}

module.exports = UserClass;