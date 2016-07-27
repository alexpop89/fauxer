let instance = null;

class HelperClass {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    generateRandomHash() {
        var number = Math.random() * new Date().getTime();
        return number.toString(36);
    }

    makeArray(param) {
        if (typeof param === 'object') {
            return Array.map(param, function(value) {
                return [value];
            });
        }

        return [param];
    }
}

module.exports = new HelperClass();