export function authenticate(req, res, next) {
  if (req.session.username) {
    // User is authenticated, proceed
    next();
  } else {
    res.redirect("/admin/login");
  }
}

export function redirectIfAuthenticated(req, res, next) {
  if (req.session.username) {
    res.redirect(301, "/admin");
  } else {
    next();
  }
}
