const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../../middlewares/validar-campos');
const { esRoleValido, existeEmail } = require('../helpers/db-validators');

const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch } = require('../controllers/usuario');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'El password es obligatorio y debe de tener más de 6 caracteres.').isLength({ min: 6 }),
    check('correo', 'El correo no es válido.').isEmail(),
    check('correo').custom(existeEmail),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/', usuariosPatch);


module.exports = router;