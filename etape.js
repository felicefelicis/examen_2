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
var db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1/carnet', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8081, () => {
    console.log('connexion à la BD et on écoute sur le port 8081')
  })
})

// collection yeah
app.get('/',  (req, res, next) => {
    var cursor = db.collection('adresse').find().toArray(function(err, resultat){
    if(err) return next(err);
		res.render('index.ejs', {adresse: res});
	});
})

/*var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("L'application écoute sur http://%s", host, port)
})
*/

//etape #1
app.get('/fichier', function (req, res) {
	fs.readFile( __dirname + "/public/text/" + "collection_provinces.json", 'utf8', function (err, data) {
		if(err) return next(err);
		console.log( data );
		res.end(data);
	});
})

//etape #2
app.get('/provinces',  (req, res, next) => {
	var obj;
	fs.readFile( __dirname + "/public/text/" + "collection_provinces.json", 'utf8', function (err, data) {
		if(err) return console.error(err);
		obj = JSON.parse(data);
		console.log(obj);
		res.render('index.ejs', {adresse: obj});
	});
});

//etape #3

//etape #4
/*
db.collection('carnet').insertOne(newRecord, (err, resultat) => {
    if(err) return next(err);
    res.send({ "id": resultat.insertedId });
  }); 
};*/
//etape #5

//etape #6
