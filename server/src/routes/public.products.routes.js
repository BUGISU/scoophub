const express = require("express");
const router = express.Router();

const { products } = require("../data/products");

// 공개 제품 목록 (APPROVED만)
router.get("/products", (req, res) => {
  const approved = products.filter((p) => p.status === "APPROVED");
  res.json({ products: approved });
});

module.exports = router;
