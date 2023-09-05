var express = require("express");
var router = express.Router();
const { upload_add } = require("../middleware/upload");
const addController = require("../controller/add.controller");
router.get("/", (req, res, next) => {
     res.send("respond with a resource");
});

router.post("/add", upload_add, addController.add);
router.post("/update", upload_add, addController.update);
router.post("/getall", addController.getAll);
router.post("/delete", addController.delete);
module.exports = router;