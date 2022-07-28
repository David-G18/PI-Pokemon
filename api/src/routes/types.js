const { Router } = require('express');
const typeController = require('../controllers/types');

const router = Router();

router.get('/', typeController.getType);
router.get('/:id', typeController.getById);

module.exports = router;