var express = require("express");
var router = express.Router();
const { upload_adventure } = require("../middleware/upload");
const adventureController = require("../controller/adventure.controller");
router.get("/", (req, res, next) => {
     res.send("respond with a resource");
});

router.post("/add", upload_adventure, adventureController.add);
router.post("/delete", adventureController.delete);
router.post("/getall", adventureController.getAll);
module.exports = router;