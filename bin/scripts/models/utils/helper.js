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

    getLinesObject(stringData, lineNo) {
        let linesData = JSON.parse(stringData);
        let result = '';

        for (let line in linesData) {
            if (linesData.hasOwnProperty(line)) {
                result = parseInt(line, 10) === lineNo ? result + '<span class="active">' : result;
                result += '<strong>' + line + ':' + '</strong>';
                result += linesData[line] + '\n';
                result += '</br>';
                result = parseInt(line, 10) === lineNo ? result + '</span>' : result;
            }
        }

        return result;
    }
}

module.exports = new HelperClass();