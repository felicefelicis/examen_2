const fs = require("fs");
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const app = express();

app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public
app.use(bodyParser.json())  // pour traiter les données JSON


MongoClient.connect('mongodb://127.0.0.1:27017/carnet', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8081, () => {
    console.log('connexion à la BD et on écoute sur le port 8081')
  })
})

//pour afficher le fichier index.ejs
app.get('/',  (req, res) => {
	res.render("index.ejs");

})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("L'application écoute sur http://%s", host, port)
})

//etape #1
app.get('/fichier', function (req, res) {
	fs.readFile( __dirname + "/public/text/" + "collection_provinces.json", 'utf8', function (err, data) {
		if(err) return next(err);
		console.log( data );
		res.end(data);
	});
})

//etape #2
app.get('/provinces', function (req, res) {
	fs.readFile( __dirname + "/public/text/" + "collection_provinces.json", 'utf8', function (err, data) {
		if(err) return next(err);
		console.log( data );
		res.render('index.ejs', {provinces : JSON.parse(data)})
	});
})

//etape #3

//etape #4
/*
db.collection('province').insertOne(newRecord, (err, resultat) => {
    if(err) return next(err);
    res.send({ "id": resultat.insertedId });
  }); 
};*/
//etape #5

//etape #6
