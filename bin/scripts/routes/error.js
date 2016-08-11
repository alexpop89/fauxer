const ProjectController = require('../controllers/project');
const ErrorController = require('../controllers/error');
const ErrorClass = require('../models/error');
const Middleware = require('../models/utils/middleware');
const config = require('../../../config');

const express = require('express');
const router = express.Router();

router.post('/', (request, response) => {
    'use strict';

    ProjectController.getProjectDetails(request.body.id).then(project => {
        for (let error in request.body.errors) {
            if (request.body.errors.hasOwnProperty(error)) {
                new ErrorClass(request.body.errors[error], project[0].id).save();
            }
        }

        response.statusCode = 200;
        response.end();
    });
});

router.get('/details/:projectId/:id', Middleware.validateSession, (request, response) => {
    'use strict';
    let projectId = parseInt(request.params.projectId ,10);
    let errorId = parseInt(request.params.id ,10);

    ProjectController.getProjectDetails(projectId).then(results => {
        if (results && results[0]) {
            ErrorController.getAllOccurrences(projectId, errorId).then(errors => {
                response.render('pages/error-details', {
                    loggedIn: true,
                    errors: errors,
                    loadStates: config.LOAD_STATES
                });
            });
        }
    });
});

module.exports = router;