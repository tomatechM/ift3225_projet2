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

	user.findById(req.user.userId)
	.then(u => {
		if (!u.isAdmin) {return res.status(403).json({error: "Access denied."});}
		return user.find({})
	})
	.then(users => {
		if (users.length === 0) {return res.status(200).json([]);}
		res.status(200).json(users);
	}).catch((err) => {
		res.status(500).json({error: "Erreur."});
	});
};

exports.deleteProfile = (req, res, next) => {

	user.findByIdAndDelete(req.params.id)
	.then(user => {
		if (!user) {return res.status(404).json({message: "Utilisateur n'existe pas"});}
		res.status(200).json(user);
	}).catch((err) => {
		res.status(500).json({error: "Erreur"});
	});
};

exports.updateProfile = (req, res, next) => {

	user.findById(req.params.id)
	.then(u => {
		if (!u) {return res.status(404).json({message: "Utilisateur n'existe pas"});}

		if (String(req.user.userId) !== String(u._id) && !req.user.admin) {
                	return res.status(403).json({error: "Access denied"});
                }
		if (req.body.password) {return bcrypt.hash(req.body.password, 10);}
		else {return false;}
	}).then(hash => {
		
		const updates = {}
		if (req.body.pseudo){updates.pseudo = req.body.pseudo}
		if (req.body.email) {updates.email = req.body.email}
		if (hash) {updates.password = hash}

        	return user.findByIdAndUpdate(
			req.params.id,
			updates,
			{ returnDocument: 'after' }
		);
	}).then(u => {
		res.status(200).json(u);
	}).catch((err) => {
		res.status(500).json({error: "Failed to update."});
	});
}
