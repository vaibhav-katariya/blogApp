import { Router } from "express";
import {
  genRefreshToken,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateCurrentPasswrod,
  updateUserDetails,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(genRefreshToken);
router.route("/get-current-user").post(verifyJWT, getCurrentUser);
router.route("/change-password").post(verifyJWT, updateCurrentPasswrod);
router.route("/change-user-details").post(verifyJWT, updateUserDetails);

export default router;
