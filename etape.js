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

app.get('/',function(req,res){
    res.sendFile(path.normalize(__dirname + 'text/collection_provinces.json'))  
})


MongoClient.connect('mongodb://127.0.0.1:27017/ville-carnet', (err, database) => {
  if (err) return console.error(err)
  db = database;
  app.listen(8081, () => {
    console.log('connexion à la BD et on écoute sur le port 8081');
  });
});