var express = require("express");
var router = express.Router();
const reviewController = require("../controller/review.controller");
const { upload_review } = require("../middleware/upload");
router.get("/", (req, res, next) => {
     res.send("respond with a resource");
});

router.post("/add", upload_review, reviewController.add);
router.get("/getByCity/:city", reviewController.getByCity);
router.get("/getall", reviewController.getAll);
router.delete("/delete/:id", reviewController.delete);

module.exports = router;