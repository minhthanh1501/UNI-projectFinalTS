const router = require("express").Router();
const ctrls = require("../controllers/UserController");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.post("/register", ctrls.register);
router.post("/", ctrls.register);
router.post("/login", ctrls.login);
router.get("/current", verifyAccessToken, ctrls.getCurrentUser);
router.get("/getusers", ctrls.getUsers);
router.put("/getuser", ctrls.updateUserById);
router.get("/getuser/:_id", ctrls.getUserById);
router.delete("/getuser/:_id", ctrls.deleteUserById);

module.exports = router;
