var express = require('express');
var app = express();

app.set('views','.');

app.set('view engine', 'pug');
//app.use(express.static(__myapp));

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey',
                        message: 'Hello there!'});
});
app.get('/students', function (req, res) {
  res.render('students', { title: 'Hey',
                        message: 'Hello there!'});
});
app.get('/schools', function (req, res) {
  res.render('schools', { title: 'Hey',
                        message: 'Hello there!'});
});
app.get('/staff', function (req, res) {
  res.render('staff', { title: 'Hey',
                        message: 'Hello there!'});
});
app.get('/survey', function (req, res) {
  res.render('survey', { title: 'Hey',
                        message: 'Hello there!'});
});
app.listen(3000, function() {
    console.log('example app listening on port 3000!');
});
