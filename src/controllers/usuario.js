const { response, request } = require("express");

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit = 10 } = req.query;

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

const usuariosPost = async (req, res = response) => {


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar constraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en base de datos
    await usuario.save();

    res.status(201).json({
        msg: 'Post Api',
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.status(200).json({
        msg: 'Delete Api'
    });
}

const usuariosDelete = (req, res = response) => {
    
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