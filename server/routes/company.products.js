const express = require("express");
const router = express.Router();

const { products, createProduct } = require("../data/products");
const { requireAuth, requireRole } = require("../middlewares/auth");

// 회사: 제품 등록 → PENDING
router.post("/products", requireAuth, requireRole("company"), (req, res) => {
  const { name, brand, flavor, price } = req.body;
  if (!name) {
    return res.status(400).json({ message: "name is required" });
  }

  const product = createProduct({
    companyId: req.user.id,
    name,
    brand: brand || "",
    flavor: flavor || "",
    price: price || 0,
    status: "PENDING",
  });

  res.json({ product });
});

// 회사: 내 제품 목록
router.get("/products", requireAuth, requireRole("company"), (req, res) => {
  const myProducts = products.filter((p) => p.companyId === req.user.id);
  res.json({ products: myProducts });
});

module.exports = router;
