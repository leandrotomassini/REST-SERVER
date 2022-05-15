const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit = 10} = req.query;

    res.status(200).json({
        msg: 'Get Api',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}


const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.status(200).json({
        msg: 'Put Api',
        id
    });
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'Post Api',
        nombre,
        edad
    });
}

const usuariosPatch = (req, res = response) => {
    res.status(200).json({
        msg: 'Delete Api'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosPut
}