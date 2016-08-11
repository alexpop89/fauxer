const Validator = require('../models/utils/validator');
const DatabaseConnector = require('../models/utils/database-connector');

const config = require('../../../config');

let instance = null;

class LocationController extends Validator {
    constructor() {
        super();

        if (!instance) {
            instance = this;
        }

        return instance;
    }

    getLocationData(locationId) {
        return DatabaseConnector.find(config.DATABASE_TABLES.LOCATIONS, ['*'], {id: locationId});
    }
}

module.exports = new LocationController();