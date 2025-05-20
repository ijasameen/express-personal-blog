import config from "dotenv/config";
import connectDatabase from "../config/dbConnection.js";
import User from "../models/user.js";
import crypto from "crypto";

const PORT = process.env.PORT || 9000;
// TODO: Have to find a better way to get the url.
const BASE_URL = `http://localhost:${PORT}`;

connectDatabase();

console.log("Initializing Admin user.");
await (async function () {
  try {
    const username = process.env.ADMIN_USERNAME || "admin";
    let adminUser = await User.findOne({ username });

    if (!adminUser) {
      // Create user without a password initially
      adminUser = new User({
        username,
      });
    }

    if (adminUser.password) {
      return;
    } else {
      // Generate token
      const resetToken = crypto.randomBytes(20).toString("hex");

      // Hash the token and store it in database.
      const hashedResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      adminUser.passwordResetToken = hashedResetToken;
      // Set token expire time 1 hour
      adminUser.passwordResetExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
      await adminUser.save();

      const resetURL = `${BASE_URL}/admin/reset-password/${resetToken}`;

      if (process.env.NODE_ENV === "production") {
        // Send email in production
      } else {
        // Log to console in development
        console.log(`
******************************************************************
* IMPORTANT: Initial Admin Setup Link for ${adminUser.username}: *
* ${resetURL}                                                    *
* This link is valid for 1 hour.                                 *
******************************************************************
                `);
      }
    }
    process.exit(0);
  } catch (err) {
    console.error("Failed initialize Admin user");
    console.error(err);
    process.exit(1);
  }
})();
