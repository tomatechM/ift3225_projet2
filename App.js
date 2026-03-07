const express = require('express');
const mongoose = require('mongoose');

const routesUser = require('./userRoutes');

/*Changer <password> par le mot de passe */
mongoose.connect('mongodb+srv://tomatech04_db_user:<password>@cluster0.c3hsyyx.mongodb.net/?appName=Cluster0')
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// API routes
app.use('/api', routesUser);

app.use((req, res) => {
    res.json({ message: 'Le serveur fonctionne !!' });
});

module.exports = app;