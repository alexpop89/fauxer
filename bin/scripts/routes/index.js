let express = require('express');
let router = express.Router();

router.get('/', function(request, response) {
    response.render('pages/index', {
        loggedIn: false
    });
});

module.exports = router;