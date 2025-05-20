import bcrypt from "bcryptjs";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    passwordResetToken: String,
    passwordResetExpiry: Date,
  },
  { timestamps: true }
);

userSchema.methods.hasValidPasswordResetToken = function () {
  if (!this.passwordResetToken) return false;
  if (this.passwordResetExpiry < new Date()) return false;
  return true;
};

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.password === undefined) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = model("User", userSchema);
export default User;
