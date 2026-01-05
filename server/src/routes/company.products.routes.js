const express = require("express");
const { requireAuth, requireRole } = require("../middlewares/auth");
const { loadProducts, saveProducts } = require("../data/products.store");

const router = express.Router();

/**
 * 회사: 내 제품 목록
 * GET /api/company/products
 */
router.get("/products", requireAuth, requireRole("company"), (req, res) => {
  const products = loadProducts();
  const mine = products.filter((p) => p.companyEmail === req.user.email);
  res.json({ products: mine });
});

/**
 * 회사: 제품 등록 요청(PENDING)
 * POST /api/company/products
 *
 * body:
 * - brand (required)
 * - name (required)
 * - flavor (optional)
 * - price (required)
 * - imageUrl (optional but recommended)
 * - description (optional)
 * - ingredients (optional)
 * - nutrition (optional object)
 */
router.post("/products", requireAuth, requireRole("company"), (req, res) => {
  const products = loadProducts();

  const {
    brand,
    name,
    flavor,
    price,
    imageUrl,
    description,
    ingredients,
    nutrition,
  } = req.body || {};

  // 최소 검증
  if (!brand || !name) {
    return res.status(400).json({ message: "brand, name are required" });
  }

  const parsedPrice = Number(price);
  if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
    return res.status(400).json({ message: "price must be a valid number" });
  }

  const nextId = products.length
    ? Math.max(...products.map((p) => Number(p.id) || 0)) + 1
    : 1;

  // nutrition은 객체만 허용(문자열/배열 들어오면 방어)
  const safeNutrition =
    nutrition && typeof nutrition === "object" && !Array.isArray(nutrition)
      ? nutrition
      : {};

  const product = {
    id: nextId,
    brand: String(brand),
    name: String(name),
    flavor: flavor ? String(flavor) : "",
    price: parsedPrice,

    // 기존 더미 스키마 맞춤
    imageUrl: imageUrl ? String(imageUrl) : "",
    description: description ? String(description) : "",
    ingredients: ingredients ? String(ingredients) : "",
    nutrition: safeNutrition,

    // 워크플로우 필드
    status: "PENDING",
    rating: 0, // 초기값(리뷰 붙이면 계산)
    companyEmail: req.user.email,
    createdAt: new Date().toISOString(),
    approvedAt: null,
    rejectedAt: null,
  };

  products.push(product);
  saveProducts(products);

  res.status(201).json({ product });
});

module.exports = router;
