const {
  createUser,
  getUsersByUserId,
  getUsers,
  updateUsers,
  deleteUser,
  login,
} = require("../controllers/user.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/create_user", checkToken, createUser);
router.get("/get_user", checkToken, getUsers);
router.get("/get_user/:id", checkToken, getUsersByUserId);
router.post("/update_user", checkToken, updateUsers);
router.delete("/delete_user/:id", checkToken, deleteUser);
router.post("/login", login);

module.exports = router;
