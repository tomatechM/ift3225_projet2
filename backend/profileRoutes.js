const express = require("express");
const router = express.Router();

const profCtrl = require("./profileControler");
const auth = require("./auth");

router.get("/profils/:id", auth, profCtrl.getProfile);
router.get("/profils", auth, profCtrl.getAllProfiles);
router.put("/profils/:id", auth, profCtrl.updateProfile);
router.delete("/profils/:id", auth, profCtrl.deleteProfile);

module.exports = router;
