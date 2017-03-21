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
    console.log('connexion à la BDD!!! on écoute sur le port 8081')
  })
})

// collection yeah
app.get('/',  (req, res, next) => {
    var cursor = db.collection('adresse').find().toArray(function(err, resultat){
    if(err) return next(err);
		res.render('index.ejs', {adresse: res});
	});
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
app.get('/provinces',  (req, res, next) => {
	var bddJson;
	fs.readFile( __dirname + "/public/text/" + "collection_provinces.json", 'utf8', function (err, data) {
		if(err) return console.error(err);
		bddJson = JSON.parse(data);
		console.log(bddJson);
		res.render('index.ejs', {adresse: bddJson});
	});
});

//etape #3
// Je ne suis pas certaine qu'il se connecte a la bonne BDD par contre... j'ai mes anciennes données qui s'y accumule
app.get('/collection',  (req, res, next) => {
	var cursor = db.collection('adresse').find().toArray(function(err, resultat){
      if(err) return next(err);
      res.render('index.ejs', {adresse: resultat});
    })
});

//etape #4
app.get('/ajouter',  (req, res, next) => {
	//prend un chiffre random
	var chiffreRandom = Math.floor((Math.random()*100))+100;
	var cursor = db.collection('adresse').find().toArray(function(err, resultat){
      if(err) return next(err);
      // ce que je vais ajouter #toujoursLaMêmeChose
      db.collection('adresse').insertOne({
			"code" : "QC",
			"nom" : "Québec",
			"capital": chiffreRandom
      })
      res.render('index.ejs', {adresse: resultat});
    })
    //retour a l'acceuil
    res.redirect('/');
});

//etape #5
// ajouter plusieurs? Pas eu le temps....
// db.collection('adresse').addMany() ????

//etape #6
app.get('/supprimer',  (req, res, next) => {
	var cursor = db.collection('adresse').find().toArray(function(err, resultat){
      if(err) return next(err);
      db.collection('adresse').deleteMany()
    })
    //retour a l'acceuil
    res.redirect('/');
});
