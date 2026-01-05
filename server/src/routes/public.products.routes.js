const express = require("express");
const { loadProducts } = require("../data/products.store");

const router = express.Router();

// 공개: 승인된 제품만 노출
router.get("/products", (req, res) => {
  const products = loadProducts();
  const published = products.filter((p) => p.status === "APPROVED");
  res.json({ products: published });
});

module.exports = router;
