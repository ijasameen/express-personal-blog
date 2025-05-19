import { Router } from "express";
import {
  getAllView,
  getCreateView,
  getEditView,
  createPost,
  editPost,
  deletePost,
} from "../controllers/adminController.js";

const router = Router();

router.use((req, res, next) => {
  req.ejsLayout = "layouts/admin-layout";
  next();
});

// Requests for views
router.get("/{index{.html}}", getAllView);
router.get("/create{.html}", getCreateView);
router.get("/edit/:id", getEditView);
// Requests for form
router.post("/create{.html}", createPost);
router.put("/edit/:id", editPost);
router.delete("/delete/:id", deletePost);

export default router;
