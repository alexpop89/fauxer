const config = require('../../../config');
const Location = require('../models/location');

class ErrorClass {
    constructor({message, source, lineNo, colNo, loadState, timestamp, userAgent, location, stackTrace}) {
        this.message = message;
        this.source = source;
        this.lineNo = lineNo;
        this.colNo = colNo;
        this.loadState = loadState;
        this.timestamp = timestamp;
        this.userAgent = userAgent;
        this.location = new Location(location);
        this.loadState = loadState;
        this.loadStatePretty = config.LOAD_STATES[loadState];
        this.stackTrace = stackTrace;

        console.log(this);
    }

    save() {

    }
}

module.exports = ErrorClass;