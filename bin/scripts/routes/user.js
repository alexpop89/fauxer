const AuthenticationController = require('../controllers/user');
const config = require('../../../config');

let session = require('express-session');
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
        request.session.sessionHash = data.sessionHash;
        request.session.userId = data.userId;
        response.redirect('/');
    }, () => {
        response.render('pages/sign-in', {
            loggedIn: false
        });
    })
});

module.exports = router;