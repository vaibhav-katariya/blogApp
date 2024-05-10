import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middlerware.js";
import { getAllBlog, uploadBlog } from "../controllers/blog.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/upload").post(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),uploadBlog
)
router.route("/getAllBlog").get(getAllBlog)

export default router