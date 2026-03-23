const express = require('express');
const router = express.Router();

const passCtrl = require('./passwordControler');
const auth = require('./auth');

router.get('/motdepasse/:len', passCtrl.genPassword);
//router.get('/motdepasse/:len', async (req, res) => {console.log("/motdepasse");});

module.exports = router;
