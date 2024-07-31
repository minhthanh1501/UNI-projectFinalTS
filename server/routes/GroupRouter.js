const router = require("express").Router();
const ctrls = require("../controllers/GroupController");

router.post("/", ctrls.createGroup);
router.delete("/", ctrls.deleteGroupById);
router.put("/getgroup", ctrls.updateGroupById);
router.get("/getgroups", ctrls.getGroups);
router.get("/getgroup/:_id", ctrls.getGroupById);
router.delete("/getgroup/:_id", ctrls.deleteGroupById);
router.get("/menugroup", ctrls.checkMenuForGroup);
router.post("/addmenugroup", ctrls.addMenuToGroup);
router.delete("/deletemenugroup", ctrls.deleteMenuFromGroup);

module.exports = router;
