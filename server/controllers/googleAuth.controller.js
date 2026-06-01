import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import { verifyGoogleToken } from "../services/googleAuth.service.js";

const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const googleAuth = async (req, res) => {
  try {
    const payload =
      typeof req.body.token === "string"
        ? await verifyGoogleToken(req.body.token)
        : req.body;

    const { sub, email, name, picture, email_verified } = payload;

    if (!email || !sub) {
      return res.json({ success: false, message: "Invalid Google user data" });
    }

    if (!email_verified) {
      return res.json({
        success: false,
        message: "Google email is not verified",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = await bcrypt.hash(Math.random().toString(36), 10);

      user = await User.create({
        name,
        email,
        password: randomPassword,
        googleId: sub,
        authProvider: "google",
        role: "customer",
      });
    } else {
      if (!user.googleId) {
        user.googleId = sub;
        user.authProvider = "google";
        await user.save();
      }
    }

    const token = createToken(user);

    return res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    return res.json({ success: false, message: error.message });
  }
};
