import User from "../models/user.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function getLoginView(req, res) {
  try {
    res.status(200);
    res.render("admin/login", {
      layout: req.ejsLayout,
      title: "Blog Website Admin - Login",
      containerClass: "container-small",
      hideLogout: true,
    });
  } catch (err) {
    console.error(err);
    res.send("<h1>500 Internal Error</h1>");
  }
}

export async function logout(req, res) {
  res.clearCookie("connect.sid");
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("admin/login");
  });
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();

    if (!user) {
      return res.redirect("/admin/login");
    }

    // If user hasn't set the password using the password link
    if (!user.password) {
      res.redirect("/admin/login");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If wrong password
    if (!isPasswordMatch) {
      res.redirect("/admin/login");
    }

    // note: Implementation based on the express-session npm documentation.
    req.session.regenerate(function (err) {
      if (err) throw err;

      // store user info in session
      req.session.username = req.body.username;

      // save the session before redirection to ensure page load
      // does not happen before session is saved
      req.session.save(function (err) {
        if (err) throw err;
        res.redirect("/admin");
      });
    });
  } catch (err) {
    console.error(err);
    res.send("<h1>500 Internal Error</h1>");
  }
}

export async function getResetPasswordView(req, res) {
  // Hash the incoming token to compare with the hashed token in the database.
  const resetToken = req.params.token;
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      passwordResetToken: hashedResetToken,
      // Token must not be expired
      passwordResetExpiry: { $gt: new Date() },
    });

    if (!user) {
      return res.redirect("/admin/login");
    }

    // Render the reset password form.
    res.render("admin/reset-password", {
      layout: req.ejsLayout,
      title: "Blog Website Admin - Reset Password",
      containerClass: "container-small",
    });
  } catch (err) {
    console.error(err);
    res.send("<h1>500 Internal Error</h1>");
  }
}

export async function resetPassword(req, res) {
  try {
    // Hash the incoming token to compare with the hashed token in the database.
    const resetToken = req.params.token;
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedResetToken,
      // Token must not be expired
      passwordResetExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.redirect("/admin/login");
    }

    const { newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
      return res.redirect(`/admin/reset-password/${req.params.token}`);
    }

    if (newPassword.length < 6) {
      // Enforce minimum password length
      return res.redirect(`/admin/reset-password/${req.params.token}`);
    }

    // Set the new password (pre-save hook will hash it)
    user.password = newPassword;
    // Invalidate the token
    user.passwordResetToken = undefined;
    user.passwordResetExpiry = undefined;
    await user.save();

    res.redirect("/admin/login");
  } catch (err) {
    console.error(err);
    res.send("<h1>500 Internal Error</h1>");
  }
}
