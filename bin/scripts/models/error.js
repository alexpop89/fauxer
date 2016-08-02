const config = require('../../../config');
const Location = require('../models/location');
const DatabaseConnector = require('../models/utils/database-connector');
const BaseClass = require('../models/core/base-class');

class ErrorClass extends BaseClass{
    constructor({id, message, source, lineNo, colNo, loadState, timestamp, userAgent, location, stackTrace}, projectId) {
        super();

        this._excludedProperties = ['locationData'];

        this.id = id || 0;
        this.message = message;
        this.source = source;
        this.lineNo = lineNo;
        this.colNo = colNo;
        this.loadState = loadState;
        this.timestamp = timestamp;
        this.userAgent = userAgent;
        this.locationData = new Location(location);
        this.location = 0;
        this.loadState = loadState;
        this._loadStatePretty = config.LOAD_STATES[loadState];
        this.stackTrace = stackTrace;
        this._loadStatePretty = config.LOAD_STATES[loadState];
        this.project = projectId;

        console.log(this);
    }

    save() {
        this.locationData.save().then(() => {
            this.location = this.locationData.id;
            return DatabaseConnector.find(config.DATABASE_TABLES.ERRORS, ['*'], {id: this.id}).then(rows => {
                if (rows && rows[0]) {
                    this.id = parseInt(rows[0], 10);
                    return DatabaseConnector.update(config.DATABASE_TABLES.ERRORS, this.serialize(), {id: this.id});
                } else {
                    delete this['id'];
                    return DatabaseConnector.insert(config.DATABASE_TABLES.ERRORS, this.serialize()).then(response => {
                        var a = 2;
                    });
                }
            });
        });
    }
}

module.exports = ErrorClass;