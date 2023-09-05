var express = require("express");

var router = express.Router();
const adminController = require("../controller/admin.controller");
router.get("/", (req, res, next) => {
     res.send("respond with a resource");
});

router.post("/create", adminController.create);
router.post("/login", adminController.login);
router.post("/getAll", adminController.getAll);
module.exports = router;