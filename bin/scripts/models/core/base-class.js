class BaseClass {
    constructor() {

    }

    serialize() {
        var excluded = this._excludedProperties || [],
            result = JSON.parse(JSON.stringify(this));

        for (let index in excluded) {
            if (excluded.hasOwnProperty(index)) {
                delete result[excluded[index]]
            }
        }

        delete result['_excludedProperties'];

        return result;
    }
}

module.exports = BaseClass;