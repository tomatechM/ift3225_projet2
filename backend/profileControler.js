const User = require('./User');
const bcrypt = require('bcrypt');
const { validateEmailAddress } = require('./emailValidator');

exports.getProfile = (req, res, next) => {
    User.findById(req.params.id).select('-password') /* on récupère user sans son password*/ 
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "Utilisateur n'existe pas." });
            }

            const isOwner = req.user.userId === user._id.toString();
            if (!isOwner && !req.user.isAdmin) {
                return res.status(403).json({ error: "Access denied" });
            }

            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(500).json({ error: "Erreur" });
        });
};

exports.getAllProfiles = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ error: "Access denied." });
    }

    User.find({}).select('-password')
        .then(users => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).json({ error: "Erreur." });
        });
};

exports.deleteProfile = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ error: "Access denied." });
    }

    User.findByIdAndDelete(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "Utilisateur n'existe pas" });
            }
            const deletedUser = user.toObject();
            delete deletedUser.password;
            res.status(200).json(deletedUser);
        })
        .catch((err) => {
            res.status(500).json({ error: "Erreur" });
        });
};

exports.updateProfile = async (req, res, next) => {
    try {
        const targetId = req.params.id;
        const isOwner = req.user.userId === targetId;
        const isAdmin = req.user.isAdmin;

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ error: "Access denied." });
        }

        const updateData = {};
        if (req.body.pseudo) updateData.pseudo = req.body.pseudo;
        if (req.body.email) {
            // const emailIsValid = await validateEmailAddress(req.body.email);
            // if (!emailIsValid) {
            //     return res.status(400).json({ error: "Adresse courriel invalide." });
            // }
            updateData.email = req.body.email;
        }
        if (req.body.password) {
            updateData.password = await bcrypt.hash(req.body.password, 10);
        }
        if (isAdmin && typeof req.body.isAdmin === "boolean") {
            updateData.isAdmin = req.body.isAdmin;
        }

        const updatedUser = await User.findByIdAndUpdate(targetId, updateData, {
            new: true,
            runValidators: true,
            context: "query"
        }).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur existe pas." });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message || "Erreur lors de la mise à jour." });
    }
};
