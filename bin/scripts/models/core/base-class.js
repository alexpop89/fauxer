class BaseClass {
    constructor() {

    }

    serialize() {
        var excluded = this._excludedProperties || [],
            result = JSON.parse(JSON.stringify(this));

        for (let key in excluded) {
            if (excluded.hasOwnProperty(key)) {
                delete result[excluded[key]];
            }
        }

        for (let property in result) {
            if (result.hasOwnProperty(property)) {
                if (property.indexOf('_') === 0) {
                    delete result[property];
                }
            }
        }

        delete result._excludedProperties;
        return result;
    }

    makeDatabaseJSON(object) {
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                object[key] = object[key].replace(/"/gi, '\\"').replace(/'/gi, "\\'");
            }
        }

        return JSON.stringify(object);
    }
}

module.exports = BaseClass;