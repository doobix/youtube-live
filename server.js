var express = require('express');
var partials = require('express-partials');
var app = express();
var port = process.env.PORT || 8080;
var sys = require('sys')
var exec = require('child_process').exec;
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());

app.post('/uploaded',function(req, res, next){
    var txt_folder_name = req.body.txtFolderName;
    //...
});

var youtubedl = require('youtube-dl');
var video = youtubedl('http://www.youtube.com/watch?v=90AiXO1pAiA',
  // Optional arguments passed to youtube-dl.
  ['--format=18'],
  // Additional options can be given for calling `child_process.execFile()`.
  { cwd: __dirname });
video.on('info', function(info) {
  console.log('Download started');
  console.log('filename: ' + info.filename);
  console.log('size: ' + info.size);
});
video.pipe(fs.createWriteStream('views/input.mp4'));
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
  exec("sh ../stream.sh ", puts);
});
app.get('/view', 
function(req, res) {
  res.render('view');
});

app.listen(port);
console.log('Server is listening on ' + port);
