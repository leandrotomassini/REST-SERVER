const { Router } = require('express');
const { check } = require('express-validator');


const { usersGet, usersPost, usersPut, usersDelete, usersPatc, usersPatch } = require('../controllers/users');
const { isValidRole, emailExists, userIdExists } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.get('/', usersGet);

router.put('/:id', [
    check('id', 'It is not a valid id.').isMongoId(),
    check('id').custom(userIdExists),
    check('role').custom(isValidRole),
    validateFields
], usersPut);

router.post('/', [
    check('name', 'The name is required.').not().isEmpty(),
    check('password', 'The password is mandatory and must have more than six letters.').isLength({ min: 6 }),
    check('email', 'The email is not valid.').isEmail(),
    check('email').custom(emailExists),
    check('role').custom(isValidRole),
    validateFields
], usersPost);

router.delete('/:id', [
    check('id', 'It is not a valid id.').isMongoId(),
    check('id').custom(userIdExists),
    validateFields
], usersDelete);

router.patch('/', usersPatch)

module.exports = router;