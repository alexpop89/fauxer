const ErrorClass = require('../models/session');
const Validator = require('../models/utils/validator');
const DatabaseConnector = require('../models/utils/database-connector');

const config = require('../../../config');

let instance = null;

class ProjectController extends Validator {
    constructor() {
        super();

        if (!instance) {
            instance = this;
        }

        return instance;
    }

    getErrorsForProject(projectId) {
        return DatabaseConnector.find(config.DATABASE_TABLES.ERRORS, ['*'], {project: projectId});
    }
}

module.exports = new ProjectController();