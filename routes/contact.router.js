var express = require("express");
var router = express.Router();
const contactController = require("../controller/contact.controller");
router.get("/", (req, res, next) => {
     res.send("respond with a resource");
});

router.post("/add", contactController.add);
router.post("/update", contactController.update);
router.post("/getall", contactController.getAll);
module.exports = router;