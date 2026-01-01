const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../data/users");
const { requireAuth } = require("../middlewares/auth");

const router = express.Router();

function signToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
}

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res
      .status(400)
      .json({ ok: false, message: "email/password required" });
  }

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ ok: false, message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ ok: false, message: "Invalid credentials" });
  }

  const token = signToken(user);

  return res.json({
    ok: true,
    accessToken: token,
    user: { id: user.id, email: user.email, role: user.role, name: user.name },
  });
});

// GET /api/auth/me  (토큰으로 내 정보 확인)
router.get("/me", requireAuth, (req, res) => {
  return res.json({ ok: true, user: req.user });
});

module.exports = router;
