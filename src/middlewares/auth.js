const { verify } = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authSecret = process.env.JWT_AUTH_SECRET

module.exports.authorize =  (req, res, next) => {
    try {
        let tokenHeader = req.header('Authorization');
        const token = tokenHeader.split(" ")[1].trim();
        const decoded = verify(token, authSecret);
        req.user = decoded;
        next();
    } catch(error) {
        if (error.name === 'TokenExpiredError') return res.status(401).json('Token Expired');
        else if (error.name === 'TypeError') return res.status(401).send('Access denied.No token provided');
        else if (error.name === 'JsonWebTokenError') return res.status(401).json('Invalid Token');
        else return res.status(500).send('Internal server error');
    }
};
