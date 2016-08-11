const express = require('express');
let router = express.Router();

router.get('/', (request, response) => {
    'use strict';

    response.render('pages/index', {
        loggedIn: (request.session.sessionHash && request.session.userId)
    });
});

module.exports = router;