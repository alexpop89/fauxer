const ProjectController = require('../controllers/project');
const ErrorController = require('../controllers/error');
const Middleware = require('../models/utils/middleware');
const config = require('../../../config');

let express = require('express');
let router = express.Router();

router.get('/list',  Middleware.validateSession, function(request, response) {
    ProjectController.getProjects(request.session.userId).then((projectsList) => {
        response.render('pages/project-list', {
            loggedIn: true,
            projects: projectsList
        });
    }, () => {
        response.redirect('/');
    });
});

router.get('/details/:projectId', function (request, response) {
    var projectId = parseInt(request.params.projectId, 10) || false;

    if (projectId) {
        ProjectController.getProjectDetails(projectId).then((project) => {
            ErrorController.getErrorsForProject(project[0].id).then(errors => {
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