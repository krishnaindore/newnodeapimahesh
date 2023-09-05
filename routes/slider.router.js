var express = require("express");
var router = express.Router();
const { upload_slider } = require("../middleware/upload");
const sliderController = require("../controller/slider.controller");
router.get("/", (req, res, next) => {
     res.send("respond with a resource");
});

router.post("/add", upload_slider, sliderController.add);
router.post("/update", upload_slider, sliderController.update);
router.post("/getall", sliderController.getAll);
router.post("/delete", sliderController.delete);
module.exports = router;