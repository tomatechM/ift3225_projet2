const express = require('express');
const router = express.Router();

const profCtrl = require('./profileControler');
const auth = require('./auth');

router.get('/profils/:id', profCtrl.getProfile);
//router.put('/profils/:id', async (req, res) => {console.log("PUT /profils/:id reached");});
router.get('/profils', auth, profCtrl.getAllProfiles);
router.delete('/profils/:id', auth, profCtrl.deleteProfile);
router.put('/profils/:id', auth, profCtrl.updateProfile);

module.exports = router;
