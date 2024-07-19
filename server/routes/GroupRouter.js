const router = require("express").Router();
const ctrls = require("../controllers/GroupController");

router.post("/", ctrls.createGroup);
router.post("/adduser", ctrls.addUserToGroup);
router.delete("/", ctrls.deleteGroupById);
router.put("/", ctrls.updateGroupById);
router.delete("/deleteuser", ctrls.deleteUserFromGroup);
router.get("/:_id", ctrls.getUsersByGroupId);
router.get("/search", ctrls.searchByGroupname);

module.exports = router;
