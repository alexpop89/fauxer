const AuthenticationController = require('../controllers/user');
const config = require('../../../config');

let express = require('express');
let router = express.Router();

router.get('/sign-in', function(request, response) {
    response.render('pages/sign-in', {
        loggedIn: false
    });
});

router.get('/sign-up', function(request, response) {
    response.render('pages/sign-in', {
        loggedIn: false
    });
});

router.get('/sign-out', function(request, response) {
    response.render('pages/sign-in', {
        loggedIn: true
    });
});

router.post('/sign-in', function(request, response) {
    AuthenticationController.signInAction(request.body).then((data) => {
        response.statusCode = 200;
        response.end(JSON.stringify(data));
    }, () => {
        response.render('pages/sign-in', {
            loggedIn: false
        });
    })
});

module.exports = router;