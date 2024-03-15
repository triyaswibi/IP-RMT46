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
const { initiateMidtransTrx } = require("../controllers/payment")
const authorization = require("../middlewares/authorization");
const multer = require('multer');  
const upload = multer({storage: multer.memoryStorage()})

router.get("/payment/midtrans/initiate", initiateMidtransTrx)
router.post("/", createVechile);
router.get("/", getVechile);
router.use(authorization);
router.get("/:id", getVechileById);
router.put("/:id", updateVechileById);
router.delete("/:id", deactiveVechileById);
router.patch("/imgUrl/:id", upload.single("file"), updateVechileImgUrlById);

module.exports = router;