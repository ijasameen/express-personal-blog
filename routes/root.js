import { Router } from "express";
import {
  getBlogPostView,
  getBlogsView,
} from "../controllers/blogController.js";

const router = Router();

router.get("/{index{.html}}", (req, res) => {
  res.status(200);
  res.render("index", { title: "Blog Website - Home", page: "Home" });
});

router.get("/blogs{.html}", getBlogsView);
router.get("/blogs/:slug", getBlogPostView);

export default router;
