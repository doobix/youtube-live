var express = require('express');
var partials = require('express-partials');
var app = express();
var port = process.env.PORT || 8080;
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

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
  exec("ls -la", puts);
});
app.get('/view', 
function(req, res) {
  res.render('view');
});

app.listen(port);
console.log('Server is listening on ' + port);
