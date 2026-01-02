const express = require("express");
const router = express.Router();

const { products } = require("../data/products");
const { requireAuth, requireRole } = require("../middlewares/auth");

// 관리자: 승인 대기 목록
router.get(
  "/products/pending",
  requireAuth,
  requireRole("admin"),
  (req, res) => {
    const pending = products.filter((p) => p.status === "PENDING");
    res.json({ products: pending });
  }
);

// 관리자: 승인
router.post(
  "/products/:id/approve",
  requireAuth,
  requireRole("admin"),
  (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((p) => p.id === id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.status !== "PENDING") {
      return res.status(400).json({ message: "Product is not pending" });
    }

    product.status = "APPROVED";
    product.approvedAt = new Date().toISOString();
    product.approvedBy = req.user.id;

    res.json({ product });
  }
);

module.exports = router;
