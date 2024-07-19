const router = require("express").Router();
const ctrls = require("../controllers/UserController");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.post("/register", ctrls.register);
router.post("/", ctrls.register);
router.post("/login", ctrls.login);
router.get("/current", verifyAccessToken, ctrls.getCurrentUser);
router.get("/getall", ctrls.getUsers);
router.get("/:_id", ctrls.getUserById);
router.put("/", ctrls.updateUserById);
router.delete("/:_id", ctrls.deleteUserById);
router.post("/searchuser", ctrls.searchUserByUsernameOrEmail);

module.exports = router;
