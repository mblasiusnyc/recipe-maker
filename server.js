var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var recipes = [
	{
		id: 1,
		recipeName: "My least favorite recipe",
		description: "This is an OK recipe",
		ingredients: ["Bread", "Milk", "Juice"]
	},
	{
		id: 2,
		recipeName: "My MOST favorite recipe",
		description: "This is a GREAT recipe",
		ingredients: ["Bread", "Milk", "Juice"]
	}
]

app.get('/api/recipes', function(req, res, next) {
	console.log('GET request sent to /api/recipes')

	res.send(JSON.stringify(recipes))
});

app.post('/api/recipes', function(req, res) {
	req.body.id = recipes.length+1;
	if(!req.body.instructions) req.body.instructions = ["Step one"];
	recipes.push(req.body);
	console.log('POST request to api/recipes')
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});