const ProjectController = require('../controllers/project');
const ErrorClass = require('../models/error');

const express = require('express');
const router = express.Router();

router.post('/', function (request, response) {
    ProjectController.getProjectDetails(request.body.id).then(project => {
        for (let error in request.body.errors) {
            new ErrorClass(request.body.errors[error], project[0].id).save();
        }

        response.statusCode = 200;
        response.end();
    });
});

module.exports = router;