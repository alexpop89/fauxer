const config = require('../../../config');
const Location = require('../models/location');
const DatabaseConnector = require('../models/utils/database-connector');
const BaseClass = require('../models/core/base-class');
const Lines = require('../models/lines');
const Promise = require('promise');
const http = require('http');

class ErrorClass extends BaseClass {
    constructor({id, message, source, lineNo, colNo, loadState, timestamp, userAgent, location, locationData, stackTrace}, projectId) {
        super();

        this._excludedProperties = ['locationData', 'linesData'];

        this.id = id || 0;
        this.message = message;
        this.source = source;
        this.lineNo = lineNo;
        this.colNo = colNo;
        this.loadState = loadState;
        this.timestamp = timestamp;
        this.userAgent = userAgent;
        this.locationData = locationData ? new Location(locationData) : null;
        this.location = location;
        this.linesData = null;
        this.lines = 0;
        this.loadState = loadState;
        this.stackTrace = stackTrace;
        this.project = projectId;

        this._loadStatePretty = config.LOAD_STATES[loadState];
    }

    fetchData() {
        return DatabaseConnector.find(config.DATABASE_TABLES.ERRORS, ['*'], {id: this.id}).then(response => {
            Object.assign(this, response[0]);
            this.locationData = new Location({id: this.location});
            this.linesData = new Lines({id: this.lines});

            return Promise.all([this.locationData.fetchData(), this.linesData.fetchData()]).then(() => {
                return this;
            });
        });
    }

    save() {
        return this._getErrorDetails(this.source, this.lineNo).then(response => {
            this.linesData = new Lines(response);

            return this.locationData.save().then(() => {
                this.location = this.locationData.id;
                return this.linesData.save().then(() => {
                    this.lines = this.linesData.id;
                    return DatabaseConnector.find(config.DATABASE_TABLES.ERRORS, ['*'], {id: this.id}).then(rows => {
                        if (rows && rows[0]) {
                            this.id = parseInt(rows[0], 10);
                            return DatabaseConnector.update(config.DATABASE_TABLES.ERRORS, this.serialize(), {id: this.id});
                        } else {
                            delete this.id;
                            return DatabaseConnector.insert(config.DATABASE_TABLES.ERRORS, this.serialize()).then(response => {
                                var a = 2;
                            });
                        }
                    });
                });
            });
        });
    }

    _getErrorDetails(source, lineNo) {
        let host = source.split(/\/+/g)[1];
        let path = source.split(host)[1];
        let body = '';

        return new Promise(resolve => {
            http.get({
                host: host,
                path: path,
                method: 'GET'
            }, res => {
                // Continuously update stream with data
                res.on('data', data => {
                    body += data;
                });
                res.on('end', () => {
                    let lines = body.split('\n');
                    let data = {};

                    data[lineNo - 1] = lines[lineNo - 1];
                    data[lineNo] = lines[lineNo];
                    data[lineNo + 1] = lines[lineNo + 1];
                    data[lineNo + 2] = lines[lineNo + 2];
                    data[lineNo + 3] = lines[lineNo + 3];

                    resolve(data);
                });
            });
        });
    }
}

module.exports = ErrorClass;