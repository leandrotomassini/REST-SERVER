const { response, request } = require('express');

const bcryptjs = require('bcryptjs');

const User = require('../models/users');

const usersGet = async(req, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });

}

const usersPost = async(req, res) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Check if the mail exists
    const emailExists = await User.findOne({ email });

    if (emailExists) {
        return res.status(400).json({
            msg: "This email is already registered."
        });
    }

    // Encrypt password
    const salt = bcryptjs.genSaltSync(12);
    user.password = bcryptjs.hashSync(password, salt);

    // Save to database
    await user.save();

    res.status(201).json({
        user
    });
}

const usersPut = async(req, res) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    // TODO Validate against the database

    if (password) {
        // Encrypt password
        const salt = bcryptjs.genSaltSync(12);
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest, { new: true });

    res.status(400).json(user);
}

const usersPatch = (req, res) => {
    res.json({
        "msg": "PATCH API"
    })
}

const usersDelete = async(req, res) => {

    const { id } = req.params;

    // Physically erased
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, { status: false });

    res.json({
        user
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
}