const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        // check password
        const result_check_password = bcrypt.compareSync(req.body.password, candidate.password);

        if (result_check_password) {
            //generate token , password true
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 3600});

            res.status(200).json({
                token: `Bearer: ${token}`
            });
        } else {
            // Password is bad
            res.status(401).json({
                message: 'Password is wrong !'
            })
        }
    } else {
        // user is absent error
        res.status(404).json({
            message: 'This user is not in DB'
        })
    }
};

module.exports.register = async function (req, res) {
    // get email passwordd
    // find by email
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        //user is be, need to send error
        res.status(409).json({
            message: 'This email is unavailable. Try to enter enother email.'
        })
    } else {
        //needed create user
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const password_hash = bcrypt.hashSync(password, salt);

        const user = new User({
            email: req.body.email,
            password: password_hash
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            //error
            res.status(500).json('Error with work DB');
        }
    }
};
