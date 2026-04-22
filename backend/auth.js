const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
    
	const authHead = req.headers['Authorization'];
	const token = authHead && authHead.split(' ')[1];

        if (!token) {return res.status(401).json({error: "Pas de token"});}

        let user;
        try {
                user = jwt.verify(token, process.env.JWT_SECRET);
		res.status(200).json({user: user});
		next();
        } catch {
                return res.status(401).json({error: "Token invalide"});
        }
};

module.exports = authToken;
