const { response } = require("express");
const { Categoria } = require('../models');

const obtenerCategorias = async(req, res = response) => {

    const { desde = 1, limite = 5 } = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        categorias,
        total
    });
}

// obtenerCategoria - populate {}
const obtenerCategoria = async(req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');


    res.json(categoria);

}


const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre } ya existe.`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    // Guardar en DB
    await categoria.save();

    res.status(201).json(categoria);

}

// actualizarCategoria
const actualizarCategoria = async(req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json(categoria);
}

// borrarCategoria - estado:false
const borrarCategoria = async(req, res = response) => {
    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(categoriaBorrada);
}


module.exports = {
    borrarCategoria,
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria
}