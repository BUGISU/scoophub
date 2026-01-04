const express = require("express");
const { requireAuth, requireRole } = require("../middlewares/auth");
const { loadProducts, saveProducts } = require("../data/products.store");

const router = express.Router();

// 회사 제품 등록
router.post("/products", requireAuth, requireRole("company"), (req, res) => {
  const { name, price, flavor } = req.body;

  if (!name) {
    return res.status(400).json({ message: "제품명이 필요합니다." });
  }

  const products = loadProducts();

  const newProduct = {
    id: Date.now(),
    companyId: req.user.id,
    companyEmail: req.user.email,
    name,
    flavor,
    price,
    status: "PENDING", // 🔴 핵심
    createdAt: new Date().toISOString(),
  };

  products.push(newProduct);
  saveProducts(products);

  res.status(201).json({ product: newProduct });
});

// 회사 내 제품 목록
router.get("/products", requireAuth, requireRole("company"), (req, res) => {
  const products = loadProducts();
  const mine = products.filter((p) => p.companyId === req.user.id);
  res.json({ products: mine });
});

module.exports = router;
