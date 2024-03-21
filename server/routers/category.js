const express = require('express');
const router = express.Router();
const { getCategory, createCategory, updateCategoryById } = require('../controllers/category')
const authorization = require('../middlewares/authorization');

router.get('/', getCategory)
router.post('/', createCategory)
router.put('/:id', authorization, updateCategoryById)

module.exports = router;