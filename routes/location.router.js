var express = require("express");
var router = express.Router();
const locationController = require("../controller/locations.controller");
const { upload_locationCara  } = require("../middleware/upload");
router.get("/", (req, res, next) => {
     res.send("respond with a locations resource");
});
router.post("/add", upload_locationCara, locationController.add);
router.get("/getByState/:state", locationController.getByState);
router.get("/getall", locationController.getAll);
// router.put("/update/:id", upload_locationCara,locationController.update);
router.delete("/delete/:id", locationController.delete);

router.put("/updateStateData", upload_locationCara, locationController.updateStateData);
router.put("/updatelocationData", upload_locationCara, locationController.updatelocationData);

router.delete("/deleteLocation/:id/:state", locationController.deleteLocation);
module.exports = router;  