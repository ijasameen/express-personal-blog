import session from "express-session";
import MongoStore from "connect-mongo";

export default function configureSession() {
  return session({
    secret: process.env.SESSION_SECRET,
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something stored
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CONN,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60, // Session will expire in 14 days (in seconds)
      autoRemove: "interval",
      autoRemoveInterval: 10, // In minutes. Checks every 10 minutes to remove expired sessions.
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
      maxAge: 14 * 24 * 60 * 60 * 1000, // Cookie expiration in milliseconds (14 days)
      sameSite: "Strict", // Protection against CSRF attacks
    },
  });
}
