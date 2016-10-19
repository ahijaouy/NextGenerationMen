var express = require('express');
var app = express();

app.set('views','.');

app.set('view engine', 'pug');
//app.use(express.static(__myapp));

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey',
                        message: 'Hello there!'});
});
app.listen(3000, function() {
    console.log('example app listening on port 3000!');
});
