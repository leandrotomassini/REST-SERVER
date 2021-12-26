const bcryptjs = require("bcryptjs");
const { response } = require("express");

const User = require('../models/users');

const { generateJWT } = require("../helpers/generateJWT");


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // Check if the email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: 'Username or password are not correct.'
            });
        }


        // Check if the user is active
        if (!user.status) {
            return res.status(400).json({
                msg: 'Username or password are not correct.'
            });
        }


        // Verify password
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Username or password are not correct.'
            });
        }

        // Generate the JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        return res.status(500).json({
            msg: `Talk to the administrator.`
        });
    }
}

module.exports = {
    login
}