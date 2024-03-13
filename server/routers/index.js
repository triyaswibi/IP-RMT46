const express = require('express');
const router = express.Router();
const { home } = require('../controllers/home')
const { loginUser } = require('../controllers/user')
const errorHandler = require('../middlewares/errorHandler')

router.get('/', home)
router.post('/login', loginUser)

router.use(errorHandler)

module.exports = router;