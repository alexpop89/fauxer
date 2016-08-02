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
            if (property.indexOf('_') === 0) {
                delete result[property];
            }
        }

        delete result['_excludedProperties'];
        return result;
    }
}

module.exports = BaseClass;