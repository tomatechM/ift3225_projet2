const User = require("./User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dns = require("dns").promises;
const { validateEmailAddress } = require("./emailValidator");

exports.signup = async (req, res, next) => {
    try {
        const { pseudo, email, password, isAdmin } = req.body;

        if (!pseudo || !email || !password) {
            return res.status(400).json({ error: "Pseudo, courriel et mot de passe sont requis." });
        }

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const domain = email.split("@")[1];
	//const emailRegex = `\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b`;

	if (!emailRegex.test(email)) {return res.status(400).json({ error: "Adresse courriel invalide." });}
	try {
		const mxRec = await dns.resolveMx(domain);
		if (mxRec.length <= 0) {throw mxRec;}
	} catch (err) {
		return res.status(400).json({ error: "Adresse courriel invalide." });
	}

        // const emailIsValid = await validateEmailAddress(email);
        // if (!emailIsValid) {
        //     return res.status(400).json({ error: "Adresse courriel invalide." });
        // }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Cette adresse courriel est déjà utilisée." });
        }

        const hash = await bcrypt.hash(password, 10);
        const user = new User({
            pseudo,
            email,
            password: hash,
            isAdmin: !!isAdmin
        });

        const savedUser = await user.save();

        const token = jwt.sign(
            { userId: savedUser._id.toString(), isAdmin: savedUser.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(201).json({
            message: `Utilisateur ${savedUser.pseudo} créé !`,
            userId: savedUser._id,
            admin: savedUser.isAdmin,
            token
        });
    } catch (error) {
        res.status(500).json({ error: error.message || error });
    }
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
                    }
                    res.status(200).json({
                        userId: user._id,
                        admin: user.isAdmin,
                        token: jwt.sign(
                            { userId: user._id.toString(), isAdmin: user.isAdmin },
                            process.env.JWT_SECRET,
                            { expiresIn: "24h" }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
