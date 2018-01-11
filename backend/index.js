var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var app = express();

app.use(session({ secret: 'mysecrettoken'}));

app.get('/', function (req, res) {
  if (!req.session.todoList) {
    req.session.todoList = 0;
  }

  req.session.todoList++;
  res.send('Hello ! you already visited this route ' + req.session.todoList + ' time(s)');
});

app.post('/add', urlEncodedParser, function (req, res) {
  if (!req.session.todoList) {
    req.session.todoList = [];
  }
  if (req.session.todoList.indexOf(req.body.todo) == -1) {
    req.session.todoList.push(req.body.todo);
    res.send(req.session.todoList);
  } else {
    res.send("existe déjà");
  }
});

app.get('/add/:todo', function (req, res) {
  if (!req.session.todoList) {
    req.session.todoList = [];
  }
  if (req.session.todoList.indexOf(req.params.todo) == -1) {
    req.session.todoList.push(req.params.todo);
    res.send(req.session.todoList);
  } else {
    res.send("existe déjà");
  }
});

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin");
  next();
});

app.post('/delete', urlEncodedParser, function (req, res) {
	if (req.session.todoList.indexOf(req.body.todo) != -1) {
		req.session.todoList.splice(req.session.todoList.indexOf(req.body.todo), 1);
	}
	res.send(req.session.todoList);
});

app.get('/getAll', function (req, res) {
	console.log("test");
	console.log(req.session.todoList);
  res.send(req.session.todoList);
});

app.get('/getPage/:page', function (req, res) {
	var start = (req.params.page-1)*2
	var end = req.params.page*2
  res.send(req.session.todoList.slice(start, end));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});