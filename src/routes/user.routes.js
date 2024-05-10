import { Router } from "express";
import {
  genRefreshToken,
  getAuthors,
  getCurrentUser,
  getUserById,
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
router.route("/get-current-user").get(verifyJWT, getCurrentUser);
router.route("/change-password").patch(verifyJWT, updateCurrentPasswrod);
router.route("/change-user-details").patch(verifyJWT, updateUserDetails);
router.route("/get-user/:id").get(verifyJWT,getUserById)
router.route("/get-authors").get(getAuthors)
export default router;
