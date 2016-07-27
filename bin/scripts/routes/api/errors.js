const express = require('express');
const router = express.Router();
const Error = require('../../models/error');

router.post('/', function (request, response) {
    for (let error in request.body.errors) {
        new Error(request.body.errors[error]);
    }

    response.statusCode = 200;
    response.end();
});

module.exports = router;