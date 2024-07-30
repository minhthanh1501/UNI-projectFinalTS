const router = require("express").Router();
const ctrls = require("../controllers/MenuController");

router.post("/", ctrls.createMenu);
router.get("/", ctrls.getMenus);

module.exports = router;
