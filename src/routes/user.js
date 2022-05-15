const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch } = require('../controllers/usuario');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.patch('/', usuariosPatch);


module.exports = router;