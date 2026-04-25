const express = require("express");
const router = express.Router();

const userCtrl = require("./userControler");

router.post("/profils", userCtrl.signup);
router.post("/enregistrement", userCtrl.signup);
router.post("/connexion", userCtrl.login);

module.exports = router;
