const Helper = require('./utils/helper');
const DatabaseConnector = require('./utils/database-connector');
const config = require('../../../config');

class ProjectClass {
    constructor({name, url, hash}) {
        this.name = name;
        this.url = url;
        this.hash = hash || Helper.generateRandomHash();
    }

    save() {
        return this.id ?
            DatabaseConnector.update(config.DATABASE_TABLES.PROJECTS, this.serialize()) :
            DatabaseConnector.insert(config.DATABASE_TABLES.PROJECTS, this.serialize());
    }
}

module.exports = ProjectClass;