const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const tkn = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(tkn, process.env.JWT_KEY)
        req.sessionData = decodedToken;
        next();
    } catch(error) {
        console.log(error)
        return res.status(401).json({
            message: "Authentication failed"
        });
    }

}