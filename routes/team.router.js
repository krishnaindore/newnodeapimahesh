var express = require("express");
var router = express.Router();
const { upload_team } = require("../middleware/upload");
const teamController = require("../controller/team.controller");
router.get("/", (req, res, next) => {
     res.send("respond with a resource");
});

router.post("/add", upload_team, teamController.add);
router.post("/update", upload_team, teamController.update);
router.post("/getall", teamController.getAll);
router.post("/delete", teamController.delete);
module.exports = router;