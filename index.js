var express = require('express');
var config = require('./config');
var app = express();

app.set('port', (process.env.PORT || config.APPLICATION_PORT));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


