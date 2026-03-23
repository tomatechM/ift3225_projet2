const user = require('./User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authToken = require('./auth.js');

exports.getProfile = (req, res, next) => {

        user.findById(req.params.id)
        .then(user => {
                if (!user) {return res.status(404).json({message: "Utilisateur n'existe pas."});}
                if (!req.user.id.equals(user._id) && !req.user.admin) {
                        return res.status(403).json({error: "Access denied"});
                }
                res.status(200).json(user);
        }).catch((err) => {
                res.status(500).json({error: "Erreur"});
        });
};

exports.getAllProfiles = (req, res, next) => {

	if (!req.user.admin) {return res.status(403).json({error: "Access denied."});}
	user.find({})
	.then(users => {
		if (users.length === 0) {return res.status(200).json([]);}
		res.status(200).json(users);
	}).catch((err) => {
		res.status(500).json({error: "Erreur."});
	});
};

exports.deleteProfile = (req, res, next) => {

	if (!req.user.admin) {return res.status(403).json({error: "Access denied."});}
	user.findByIdAndDelete(req.params.id)
	.then(user => {
		if (!user) {return res.status(404).json({message: "Utilisateur n'existe pas"});}
		res.status(200).json(user);
	}).catch((err) => {
		res.status(500).json({error: "Erreur"});
	});
};
