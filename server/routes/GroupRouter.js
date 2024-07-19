const router = require("express").Router();
const ctrls = require("../controllers/GroupController");

router.post("/", ctrls.createGroup);
router.post("/adduser", ctrls.addUserToGroup);
router.delete("/", ctrls.deleteGroupById);
router.put("/", ctrls.updateGroupById);
router.delete("/deleteuser", ctrls.deleteUserFromGroup);
router.get("/", ctrls.getUsersByGroupId);
router.get("/search", ctrls.searchByGroupname);
router.get("/getgroups", ctrls.getGroups);
router.get("/getgroup", ctrls.getGroupById);

module.exports = router;
