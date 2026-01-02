let nextId = 1;
const products = [];

function createProduct(data) {
  const product = {
    id: nextId++,
    ...data,
    createdAt: new Date().toISOString(),
  };
  products.push(product);
  return product;
}

module.exports = {
  products,
  createProduct,
};
