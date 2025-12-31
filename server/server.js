const express = require("express");
const cors = require("cors");

const app = express();

// Vite 기본 포트: 5173
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "ScoopHub API is running" });
});

const PORT = 8080;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
