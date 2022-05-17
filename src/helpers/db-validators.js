const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {

    const existeRol = await Role.findOne({ rol });

    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la DB.`);
    }

}

// Verficiar si el correo ya existe
const existeEmail = async (correo = "") => {

    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado.`);
    }

}

module.exports = {
    esRoleValido,
    existeEmail
}