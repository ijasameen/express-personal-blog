import { Router } from "express";
import createPost from "../controllers/createPostController.js";

const router = Router();

router.use((req, res, next) => {
  req.ejsLayout = "layouts/admin-layout";
  next();
});

router.get("/create{.html}", (req, res) => {
  res.status(200);
  res.render("admin/create", {
    title: "Blog Website Admin - Create Post",
    layout: req.ejsLayout,
  });
});

router.post("/create{.html}", createPost);

export default router;
