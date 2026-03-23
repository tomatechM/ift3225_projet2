const express = require('express');
const router = express.Router();

const userCtrl = require('./userControler');
const auth = require('./auth');

router.post('/enregistrement', userCtrl.signup);
//router.post('/enregistrement', async (req, res) => {console.log("/enregistrement")});
router.post('/connexion', userCtrl.login);
//router.post('/connexion', async (req, res) => {console.log("/connexion")});

module.exports = router;
