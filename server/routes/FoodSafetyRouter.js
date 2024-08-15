const router = require("express").Router();
const ctrls = require("../controllers/FoodSafetyController");

router.post("/createOrUpdate", ctrls.createOrUpdate);
router.get("/search", ctrls.search);
router.get("/detail/:_id", ctrls.getDetailById);
router.delete("/delete", ctrls.deleteById);

module.exports = router;
