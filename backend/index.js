var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(urlEncodedParser);


app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.post('/add', urlEncodedParser, function (req, res, next) {
  if (!req.session.todoList) {
    req.session.todoList = {};
    req.session.index = 0;
  }
  if (Array.isArray(req.body.nom)) { 
    req.session.todoList["i"+req.session.index] = {'nom':req.body.nom[req.body.nom.length-1], 'description':req.body.description[req.body.description.length-1]};
  } else {
    req.session.todoList["i"+req.session.index] = {'nom':req.body.nom, 'description':req.body.description};
    console.log('todolistAdd : '+ req.session.todoList);
  }
    req.session.index++;
  res.send(req.session.todoList);
  
});

/*app.get('/add/:todo', function (req, res) {
  if (!req.session.todoList) {
    req.session.todoList = [];
  }
  req.session.todoList.push(req.params.todo);
  res.send(req.session.todoList);

});*/

app.post('/delete', urlEncodedParser, function (req, res, next) {
  console.log("todolist : "+req.body.key);
  if (Array.isArray(req.body.key)) {
    delete req.session.todoList[req.body.key[req.body.key.length-1]];
  } else {
    delete req.session.todoList[req.body.key];
  }
	res.send(req.session.todoList);
});

/*app.get('/getAll', function (req, res, next) {
  console.log("getAllList : "+req.session.todoList);
  res.send(req.session.todoList);
});*/

app.post('/getAll', urlEncodedParser, function (req, res, next) {
  console.log("getAllList : "+req.session.todoList);
  res.send(req.session.todoList);
});

app.post('/get', urlEncodedParser, function (req, res, next) {
  res.send(req.session.todoList[req.body.key]);
});

app.get('/getPage/:page/:size', function (req, res, next) {
	var start = (req.params.page-1)*req.params.size
	var end = req.params.page*req.params.size
  res.send(req.session.todoList.slice(start, end));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});