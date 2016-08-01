const Mysql = require('mysql');
const Promise = require('promise');
const Helper = require('../utils/helper');

const config = require('../../../../config');

let instance = null;

class DataBaseConnector {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    setup() {
        if (this.connection) {
            this.connection.end();
        }

        this.connection = Mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            database : config.DATABASE_NAME
        });

        return new Promise((resolve, reject) => {
            this.connection.connect(err => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            });
            console.log('Database Connection OK!');
        });
    }

    insert(table, data) {
        var columnsString = '(';
        var valuesString = '(';

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                columnsString += key + ', ';
                valuesString += '\'' + data[key] + '\', ';
            }
        }

        columnsString = columnsString.replace(/,\s*$/, "").trim();
        valuesString = valuesString.replace(/,\s*$/, "").trim();

        columnsString += ')';
        valuesString += ')';

        return this._query('INSERT INTO ' + table + ' ' + columnsString + ' VALUES ' + valuesString + ';');
    }

    update(table, data, conditions) {
        var valuesString = '';
        var conditionsString;

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                valuesString += key + '=\'' + data[key] + '\', ';
            }
        }

        valuesString = valuesString.replace(/,\s*$/, "");
        conditionsString = this._getConditionsString(conditions);

        return this._query('UPDATE ' + table + ' SET ' + valuesString + ' WHERE ' + conditionsString + ';');
    }

    find(table, columns, conditions) {
        var columnArray = Helper.makeArray(columns);
        var conditionsString;

        conditionsString = this._getConditionsString(conditions);

        return this._query('SELECT ' + columnArray.join(', ') + ' FROM ' + table + ' WHERE ' + conditionsString + ';');
    }

    remove(table, conditions) {
        var conditionsString;

        conditionsString = this._getConditionsString(conditions);

        return this._query('DELETE FROM ' + table + ' WHERE ' + conditionsString + ';');
    }

    _getConditionsString(conditions) {
        var conditionsString = '';
        var conditionIndex = 0;
        var conditionsLogic = conditions._matchAll ? 'AND' : 'OR';

        delete conditions['_matchAll'];

        for (let condition in conditions) {
            if (conditions.hasOwnProperty(condition)) {
                if (conditionIndex > 0) {
                    conditionsString += ' ' + conditionsLogic + ' ';
                }
                conditionIndex += 1;
                conditionsString += condition;

                if (conditions[condition].toString().indexOf('*') > -1) {
                    conditions[condition].replace(/\*/gi, '%');
                    conditionsString += ' LIKE \'' + conditions[condition] + '\'';
                } else {
                    conditionsString += '=\'' + conditions[condition] + '\'';
                }
            }
        }

        return conditionsString;
    }

    _query(queryString) {
        return new Promise((resolve, reject) => {
            this.connection.query(queryString, (error, rows, fields) => {
                if (error) {
                    reject();
                    throw new Error(error);
                }

                resolve(rows, fields);
            });
        });
    }
}

module.exports = new DataBaseConnector();