const ProjectController = require('../controllers/project');
const ErrorController = require('../controllers/error');
const Middleware = require('../models/utils/middleware');
const config = require('../../../config');
const express = require('express');

let router = express.Router();

router.get('/list', Middleware.validateSession, (request, response) => {
    'use strict';

    ProjectController.getProjects(request.session.userId).then((projectsList) => {
        response.render('pages/project-list', {
            loggedIn: true,
            projects: projectsList
        });
    }, () => {
        response.redirect('/');
    });
});

router.get('/details/:projectId', Middleware.validateSession, (request, response) => {
    'use strict';

    let projectId = parseInt(request.params.projectId, 10) || false;

    if (projectId) {
        ProjectController.getProjectDetails(projectId).then((project) => {
            ErrorController.getErrorsByOccurrence(project[0].id).then(errors => {
                response.render('pages/project-details', {
                    loggedIn: true,
                    project: project[0],
                    errors: errors
                });
            });
        }, () => {
            response.redirect('/');
        });
    } else {
        response.redirect('/');
    }
});

module.exports = router;