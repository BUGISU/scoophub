const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "products.json");

// 초기 파일 없으면 생성
function ensureFile() {
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, JSON.stringify([], null, 2));
  }
}

function loadProducts() {
  ensureFile();
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

function saveProducts(products) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2));
}

module.exports = {
  loadProducts,
  saveProducts,
};
