const express = require('express');
const router = express.Router();
const { getCategory, createCategory, updateCategoryById } = require('../controllers/category')
const authorization = require('../middlewares/authorization');

router.post('/', getCategory)
router.get('/', createCategory)
router.put('/:id', authorization, updateCategoryById)

module.exports = router;