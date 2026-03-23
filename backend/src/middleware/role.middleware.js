const { Circle } = require("../models/Circle.model");

const requireAdmin =
  (circleId = "id") =>
  async (req, res, next) => {
    try {
      const circle = await Circle.findById(req.params[circleId]);
      if (!circle) return res.status(404).json({ message: "Circle not found" });
      if (!circle.isAdmin(req.user._id)) {
        return res
          .status(403)
          .json({
            message: "Access denied, you are not an admin of this circle",
          });
      }
      req.circle = circle;
      next();
    } catch (err) {
      next(err);
    }
  };

const requireVerified = (req, res, next) => {
  if (!req.user.isVerified) {
    return res
      .status(403)
      .json({ message: "Please verify your account to perform this action" });
  }
  next();
};

module.exports = { requireAdmin, requireVerified };
