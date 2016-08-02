const Helper = require('./utils/helper');
const BaseClass = require('./core/base-class');
const DatabaseConnector = require('./utils/database-connector');
const config = require('../../../config');

class ProjectClass extends BaseClass {
    constructor({id, name, owner, url, hash}) {
        super();

        this.id = id || 0;
        this.name = name;
        this.url = url;
        this.owner = owner;
        this.hash = hash || Helper.generateRandomHash();
    }

    save() {
        return DatabaseConnector.find(config.DATABASE_TABLES.PROJECTS, ['*'], {url: this.url}).then(rows => {
            if (rows && rows[0]) {
                this.id = rows[0].id;
                this.hash = rows[0].hash;
                return DatabaseConnector.update(config.DATABASE_TABLES.PROJECTS, this.serialize(), {id: parseInt(rows[0].id, 10)});
            } else {
                delete this['id'];
                return DatabaseConnector.insert(config.DATABASE_TABLES.PROJECTS, this.serialize());
            }
        });
    }
}

module.exports = ProjectClass;