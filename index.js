var express = require('express');
var session = require('express-session');
var app = express();

app.use(session({ secret: 'mysecrettoken'}));

app.get('/', function (req, res) {
  if (!req.session.views) {
    req.session.views = 0;
  }

  req.session.views++;
  res.send('Hello ! you already visited this route ' + req.session.views + ' time(s)');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});