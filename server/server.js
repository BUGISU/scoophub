const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// middleware
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

// routes
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "ScoopHub API is running" });
});

app.use("/api/auth", require("./src/routes/auth.routes"));

// (테스트) 보호 API 예시
const { requireAuth, requireRole } = require("./src/middlewares/auth");
app.get("/api/admin/ping", requireAuth, requireRole("admin"), (req, res) => {
  res.json({ ok: true, message: "admin only", user: req.user });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
