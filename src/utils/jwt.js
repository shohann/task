const { sign } = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const accessTokenExpiration = "3h";
const authSecret = process.env.JWT_AUTH_SECRET

module.exports.generateAccessToken = (id, email, role) => sign({ id: id, email: email, role: role }, authSecret,{ expiresIn: accessTokenExpiration });
