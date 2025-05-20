import { Router } from "express";
import {
  getAdminPanelView,
  getCreateView,
  getEditView,
  createPost,
  editPost,
  deletePost,
} from "../controllers/adminController.js";
import {
  getLoginView,
  login,
  logout,
  getResetPasswordView,
  resetPassword,
} from "../controllers/authController.js";
import { authenticate, redirectIfAuthenticated } from "../middleware/auth.js";

const router = Router();

router.use((req, res, next) => {
  req.ejsLayout = "layouts/admin-layout";
  next();
});

// For login requests.
router.get("/login{.html}", redirectIfAuthenticated, getLoginView);
router.post("/login", login);
router.get("/reset-password/:token", getResetPasswordView);
router.post("/reset-password/:token", resetPassword);

// Authenticate for all requests in admin routes.
// except login and password reset requests.
router.use("", authenticate);

// Logout request.
router.get("/logout", logout);

// Requests for views.
router.get("/{index{.html}}", getAdminPanelView);
router.get("/create{.html}", getCreateView);
router.get("/edit/:id", getEditView);
// Direct to index if edit or delete sent without an id.
router.get("/edit", getAdminPanelView);
router.get("/delete", getAdminPanelView);

// Requests for forms.
router.post("/create{.html}", createPost);
router.put("/edit/:id", editPost);
router.delete("/delete/:id", deletePost);

export default router;
