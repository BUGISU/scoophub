const express = require("express");
const { requireAuth, requireRole } = require("../middlewares/auth");
const { loadProducts, saveProducts } = require("../data/products.store");

const router = express.Router();

// 전체 제품 조회 (관리자)
router.get("/products", requireAuth, requireRole("admin"), (req, res) => {
  const products = loadProducts();
  res.json({ products });
});

// 승인
router.patch(
  "/products/:id/approve",
  requireAuth,
  requireRole("admin"),
  (req, res) => {
    const products = loadProducts();
    const product = products.find((p) => p.id === Number(req.params.id));

    if (!product) {
      return res.status(404).json({ message: "제품 없음" });
    }

    product.status = "APPROVED";
    product.approvedAt = new Date().toISOString();

    saveProducts(products);
    res.json({ product });
  }
);

// 거절
router.patch(
  "/products/:id/reject",
  requireAuth,
  requireRole("admin"),
  (req, res) => {
    const products = loadProducts();
    const product = products.find((p) => p.id === Number(req.params.id));

    if (!product) {
      return res.status(404).json({ message: "제품 없음" });
    }

    product.status = "REJECTED";
    product.rejectedAt = new Date().toISOString();

    saveProducts(products);
    res.json({ product });
  }
);

module.exports = router;
