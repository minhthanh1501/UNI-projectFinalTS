const router = require("express").Router();
const ctrls = require("../controllers/PermissionController");

router.post("/", ctrls.createPermission);

module.exports = router;
