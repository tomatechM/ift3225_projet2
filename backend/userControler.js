const User = require('./User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash,
	    isAdmin: req.body.isAdmin
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur ' + user.pseudo + ' créé !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user){
                return res.status(401).json({message: 'Paire login/mot de passe incorrecte'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid){
                        return res.status(401).json({message: 'Paire login/mot de passe incorrecte'});
                    }
                    res.status(200).json({
                        userId: user._id,
			admin: user.isAdmin,
                        token: jwt.sign(
                            {
			    userId: user._id,
			    admin: user.isAdmin
			    },
                            'PHRASE_ALEATOIRE_TRES_LONGUE',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
