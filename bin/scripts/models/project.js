const Helper = require('./utils/helper');
const DatabaseConnector = require('./utils/database-connector');

class ProjectClass {
    constructor({name, url, hash}) {
        this.name = name;
        this.url = url;
        this.hash = hash;
    }

    generateHash() {
        this.hash = Helper.generateRandomHash();
    }

    save() {

    }
}

module.exports = ProjectClass;