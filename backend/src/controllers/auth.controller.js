const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { createError } = require('../middleware/error.middleware');

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  isVerified: user.isVerified,
  bankAccount: user.bankAccount,
  createdAt: user.createdAt,
});

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    const existing = await User.findByEmail(email);
    if (existing) throw createError(400, 'An account with this email already exists');

    const user = await User.create({ name, email, password, phone });
    const token = generateToken(user._id);

    res.status(201).json({ token, data: { user: sanitizeUser(user) } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  console.log("Loggin in")
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) throw createError(401, 'Invalid email or password');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw createError(401, 'Invalid email or password');

    if (!user.isActive) throw createError(401, 'Your account has been deactivated');

    const token = generateToken(user._id);

    res.status(200).json({ token, data: { user: sanitizeUser(user) } });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    res.status(200).json({ data: { user: sanitizeUser(req.user) } });
  } catch (err) {
    next(err);
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    const { name, phone, bankAccount } = req.body;
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (phone !== undefined) updates.phone = phone;
    if (bankAccount !== undefined) updates.bankAccount = bankAccount;

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ data: { user: sanitizeUser(updatedUser) } });
  } catch (err) {
    next(err);
  }
};
