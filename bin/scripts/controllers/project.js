const ProjectClass = require('../models/session');
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

    getProjects(userId) {
        return DatabaseConnector.find(config.DATABASE_TABLES.PROJECTS, ['*'], {owner: userId});
    }

    getProjectDetails(projectId) {
        if (this.containsLetters(projectId)) {
            return DatabaseConnector.find(config.DATABASE_TABLES.PROJECTS, ['*'], {hash: projectId});
        }

        return DatabaseConnector.find(config.DATABASE_TABLES.PROJECTS, ['*'], {id: projectId});
    }
}

module.exports = new ProjectController();