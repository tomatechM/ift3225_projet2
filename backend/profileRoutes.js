const express = require('express');
const router = express.Router();

const profCtrl = require('./profileControler');
const auth = require('./auth');

router.get('/profils/:id', profCtrl.getProfile);
//router.get('/profils', async (req, res) => {console.log("GET /profils reached");});
router.get('/profils', profCtrl.getAllProfiles);

module.exports = router;
