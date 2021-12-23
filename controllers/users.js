const { response, request } = require('express');

const usersGet = (req, res = response) => {

    const { q, name = 'No name', apikey, page = '1', limit = '10' } = req.query;

    res.json({
        "msg ": 'GET API - Controller',
        q,
        name,
        apikey,
        page,
        limit
    });

}

const usersPost = (req, res) => {

    const { name, age } = req.body;

    res.status(201).json({
        "msg ": 'POST API',
        name,
        age
    });
}

const usersPut = (req, res) => {

    const id = req.params.id;

    res.status(400).json({
        "msg ": 'PUT API',
        id
    });
}

const usersPatch = (req, res) => {
    res.json({
        "msg": "PATCH API"
    })
}

const usersDelete = (req, res) => {
    res.json({
        "msg ": 'DELETE API'
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
}