const user = require('./User');

exports.getProfile = (req, res, next) => {

        user.findById(req.params.id)
        .then(user => {
                if (!user) {return res.status(404).json({message: "Utilisateur n'existe pas."});}
                if (!req.user._id.equals(user._id) && !req.user.admin) {
                        return res.status(403).json({error: "Access denied"});
                }
                res.status(200).json(user);
        }).catch((err) => {
                res.status(500).json({error: "Erreur."});
        });
};

exports.getAllProfiles = (req, res, next) => {
	
	if (req.params.admin) {
		user.find({})
		.then(users => {
			if (users.length === 0) {return res.status(200).json();}
			res.status(200).json(users);
		}).catch((err) => {
			res.status(500).json({error: "Erreur."});
		});
	} else {
		return res.status(403).json({error: "Access denied."});
	}
};
