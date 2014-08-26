var express = require('express');
var partials = require('express-partials');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());
app.use(express.static(__dirname + '/public'));

// Root page
app.get('/', 
function(req, res) {
  res.render('index');
});
app.get('/host', 
function(req, res) {
  res.render('host');
});

app.listen(8080);
console.log('Server is listening on 8080');