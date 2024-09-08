const express = require("express");

const {
  createUser,
  deleteAccount,
  forgotPassword,
  getAllUsers,
  getMe,
  login,
  updateDetails,
  updatePassword,
  deleteUserAccount,
} = require("../controller/user.controller");

const { protect } = require("../middlewares/auth");

const router = express.Router();

router.route("/login").post(login);

router.route("/register").post(createUser);
router.route("/me").get(protect, getMe);
router.route("/forgot-password").post(protect,forgotPassword);
router.route("/update-details").put(protect, updateDetails);
router.route("/update-password").put(protect, updatePassword);
router.route("/delete").delete(protect, deleteAccount);
router.route("/deleteUser/:id").delete(protect, deleteUserAccount);


router.route("/getAllUsers").get( getAllUsers);

module.exports = router;
