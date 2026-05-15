import jwt from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.json({
        success: false,
        message: "Admin Access Required",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
