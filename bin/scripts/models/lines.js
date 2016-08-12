const DatabaseConnector = require('./utils/database-connector');
const BaseClass = require('./core/base-class');

const config = require('../../../config');

class LinesClass extends BaseClass {
    constructor({id, lineData}) {
        super();

        this.id = id || 0;
        this.lineData = this.makeDatabaseJSON(lineData);
    }

    fetchData() {
        return DatabaseConnector.find(config.DATABASE_TABLES.LINES, ['*'], {id: this.id}).then(response => {
            Object.assign(this, response[0]);
            return this;
        });
    }

    save() {
        delete this.id;
        return DatabaseConnector.insert(config.DATABASE_TABLES.LINES, this.serialize()).then(response => {
            this.id = response.insertId;
        });
    }
}

module.exports = LinesClass;