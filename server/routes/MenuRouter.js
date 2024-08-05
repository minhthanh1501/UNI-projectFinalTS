const router = require("express").Router();
const ctrls = require("../controllers/MenuController");

router.post("/", ctrls.createMenu);
router.get("/getmenus", ctrls.getMenus);
router.get("/getmenuschildren", ctrls.getMenusChildren);
router.delete("/", ctrls.deleteMenuById);
router.put("/", ctrls.updateMenuById);
router.get("/getmenubyid", ctrls.getMenuById);

module.exports = router;
