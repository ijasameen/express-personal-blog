import { Router } from "express";

const router = Router();

router.get("/{index{.html}}", (req, res) => {
  res.status(200);
  res.render("index", { title: "Blog Website" });
});

router.get("/blogs{.html}", (req, res) => {
  res.status(200);
  res.render("blogs", { title: "Blog Website - Blogs" });
});

export default router;
