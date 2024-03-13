const express = require("express");
const router = express.Router();
const {
  getVechile,
  createVechile,
  getVechileById,
  updateVechileById,
  deactiveVechileById,
  updateVechileImgUrlById,
} = require("../controllers/vechile");
const authorization = require("../middlewares/authorization");
const multer = require('multer');  
const upload = multer({storage: multer.memoryStorage()})

router.post("/", createVechile);
router.get("/", getVechile);
router.use(authorization);
router.get("/:id", getVechileById);
router.put("/:id", updateVechileById);
router.delete("/:id", deactiveVechileById);
router.patch("/imgUrl/:id", upload.single("file"), updateVechileImgUrlById);

module.exports = router;