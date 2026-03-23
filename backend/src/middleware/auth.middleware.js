const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res
          .status(401)
          .json({ message: "Not authorised, user no longer exists" });
      }

      if (user.isActive === false) {
        return res
          .status(401)
          .json({ message: "Your account has been deactivated" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Not authorised, token is invalid or expired" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Not authorised, no token provided" });
  }
};

module.exports = { protect };
