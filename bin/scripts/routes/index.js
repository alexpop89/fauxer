let express = require('express');
let router = express.Router();

router.get('/', function(request, response) {
    var loggedIn = (request.session.sessionHash && request.session.userId);
    response.render('pages/index', {
        loggedIn: loggedIn
    });
});

module.exports = router;