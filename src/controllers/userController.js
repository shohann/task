const { User } = require('../models/user');
const { generateAccessToken } = require('../utils/jwt');
const { genSalt, hash, compare } = require('bcrypt')
const { Unauthorized, Conflict } = require('../utils/appError');


module.exports.signUp = async (req, res, next) => {
    try {
        let { name, email, password } = req.body;
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        })

        await newUser.save();

        const token = generateAccessToken(newUser._id, email, newUser.role);

        res.status(201).json({
            message: 'User created',
            token: token
        })
    } catch (error) {
        next(error)
    }
}

module.exports.logIn = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email: email })
        if (!user || !(await compare(password, user.password))) {
            throw new Unauthorized("Invalid email or password");
        }
        const token = generateAccessToken(user._id,user.email, user.role);

        res.status(200)
            .json({
                message: 'Successfully LogedIn',
                token: token
        });
    } catch (error) {
        next(error); 
    }
}