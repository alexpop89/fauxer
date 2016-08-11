const ErrorClass = require('../models/error');
const Validator = require('../models/utils/validator');
const DatabaseConnector = require('../models/utils/database-connector');
const Promise = require('promise');
const http = require('http');

const config = require('../../../config');

let instance = null;

class ErrorController extends Validator {
    constructor() {
        super();

        if (!instance) {
            instance = this;
        }

        return instance;
    }

    getAllOccurrences(projectId, errorId) {
        let errorObject = new ErrorClass({id: errorId}, projectId);
        return errorObject.fetchData().then(() => {
            let searchBy = {
                _matchAll: true,
                project: projectId,
                lineNo: errorObject.lineNo,
                message: errorObject.message,
                source: errorObject.source,
                colNo: errorObject.colNo
            };

            return DatabaseConnector.find(config.DATABASE_TABLES.ERRORS, ['*'], searchBy).then((response) => {
                let errors = [errorObject];
                let promisesArray = [];

                response.forEach(error => {
                    if (error.id !== errorObject.id) {
                        promisesArray.push(new ErrorClass(error, projectId).fetchData());
                    }
                });

                return Promise.all(promisesArray).then(values => {
                    errors = errors.concat(values);
                    return errors;
                });
            });
        });
    }

    getErrorsByOccurrence(projectId) {
        return DatabaseConnector.find(config.DATABASE_TABLES.ERRORS, ['*'], {project: projectId}).then(errors => {
            return new Promise((resolve) => {
                var errorsByOccurrence = this._sortErrorsByOccurrence(errors);
                resolve(errorsByOccurrence);
            });
        });
    }


    //this function is SHIT and needs refactoring!!!!!!
    _sortErrorsByOccurrence(errorsArray) {
        var auxArray = [];

        errorsArray.forEach((error) => {
            let foundOccurrence = false;
            auxArray.forEach((auxError) => {
                const sameOccurrence = ['colNo', 'lineNo', 'source', 'message']
                        .map(prop => auxError[prop] === error[prop])
                        .indexOf(false) === -1;

                if (sameOccurrence) {
                    if (error.timestamp > auxError.timestamp) {
                        auxArray.splice(auxArray.indexOf(auxError), 1);
                        error.occurrence = auxError.occurrence + 1;
                        auxArray.push(error);
                    } else {
                        auxError.occurrence += 1;
                    }

                    foundOccurrence = true;
                }
            });

            if (!foundOccurrence) {
                error.occurrence = 1;
                auxArray.push(error);
            }
        });

        return auxArray;
    }
}

module.exports = new ErrorController();