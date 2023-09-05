var express = require("express");
var router = express.Router();
const { upload_offer } = require("../middleware/upload");
const offerController = require("../controller/offer.controller");
router.get("/", (req, res, next) => {
     res.send("respond with a resource");
});

router.post("/add", upload_offer, offerController.add);
router.post("/update", upload_offer, offerController.update);
router.post("/getall", offerController.getAll);
router.post("/delete", offerController.delete);
module.exports = router;