const Helper = require('./utils/helper');
const DatabaseConnector = require('./utils/database-connector');
const BaseClass = require('./core/base-class');
const config = require('../../../config');

class SessionClass extends BaseClass {
    constructor({id, startTimestamp, user, hash}) {
        super();

        this.id = id;
        this.startTimestamp = startTimestamp;
        this.user = user;
        this.hash = hash;
    }

    save() {
        return this._checkValidSession().then(sessionData => {
            this._refreshSession(sessionData);
            return DatabaseConnector.update(config.DATABASE_TABLES.SESSIONS, this.serialize(), {id: parseInt(sessionData.id, 10)});
        }, () => {
            this.hash = Helper.generateRandomHash();
            this.startTimestamp = new Date().getTime();
            return DatabaseConnector.insert(config.DATABASE_TABLES.SESSIONS, this.serialize());
        });
    }

    checkSessionAvailability() {
        var data = {
            _matchAll: true,
            user: this.user,
            hash: this.hash
        };

        return DatabaseConnector.find(config.DATABASE_TABLES.SESSIONS, ['*'], data).then(rows => {
            if (rows && rows[0]) {
                if (new Date().getTime() - parseInt(rows[0], 10) > config.SESSION_LIFETIME) {
                    throw new Error('Session expired.')
                }
                this.id = rows[0].id;
                this.startTimestamp = parseInt(rows[0].startTimestamp, 10);
                return this.save();
            } else {
                throw new Error('Invalid session.');
            }
        });
    }

    _checkValidSession() {
        var data = {
            id: this.id || '',
            user: this.user || '',
            _matchAll: false
        };
        return DatabaseConnector.find(config.DATABASE_TABLES.SESSIONS, ['*'], data).then(rows => {
            return new Promise((resolve, reject) => {
                (rows && rows[0]) ? resolve(rows[0]) : reject();
            })
        });
    }

    _refreshSession(sessionData) {
        this.hash = sessionData.hash || Helper.generateRandomHash();
        this.id = sessionData.id;
        this.startTimestamp = new Date().getTime();
        this.user = sessionData.user;
    }
}

module.exports = SessionClass;