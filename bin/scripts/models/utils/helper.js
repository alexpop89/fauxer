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
        return typeof param === 'object' ? param : [param];
    }
}

module.exports = new HelperClass();