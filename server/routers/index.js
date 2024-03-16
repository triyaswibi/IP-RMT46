const express = require("express");
const router = express.Router();
const { home } = require("../controllers/home");
const { loginUser, registerUser, googleLogin } = require("../controllers/user");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const routerVechile = require("./vechile")
const routerCategory = require("./category")

router.get("/", home);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/google-login", googleLogin)

router.use(authentication);
router.use('/vechile', routerVechile);
router.use('/category', routerCategory);

router.use(errorHandler);

module.exports = router;
