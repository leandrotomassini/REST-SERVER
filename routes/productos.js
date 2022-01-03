const { Router } = require('express');
const { Check } = require('express-validator');

const router = Router();

router.get('/');

router.get('/:id');

router.post('/');

router.put('/:id');

router.delete('/:id');


module.exports = router;