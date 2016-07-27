class BaseClass {
    serialize() {
        var result = {},
            clone = this._clone();

        for (let attribute in clone) {
            if (clone.hasOwnProperty(attribute) && typeof this[attribute] !== 'function') {
                result[attribute] = clone[attribute];
            }
        }
    }

    _clone() {
        var copy;

        copy = this.constructor();
        for (let attribute in this) {
            if (this.hasOwnProperty(attribute)) {
                copy[attribute] = this[attribute];
            }
        }

        return copy;
    }
}

module.exports = BaseClass;