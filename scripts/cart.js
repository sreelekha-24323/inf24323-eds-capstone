const CART_KEY = 'eds-cart';

export function getItems() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export function saveItems(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addItem(product) {
    console.log('Adding product to cart:', product);
  const items = getItems();

  const existingItem = items.find(
    (item) => item.sku === product.sku,
  );

  if (existingItem) {
    existingItem.quantity += product.quantity || 1;
  } else {
    items.push({
      sku: product.sku,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      quantity: product.quantity || 1,
    });
  }

  saveItems(items);
}

export function removeItem(sku) {
  const items = getItems().filter(
    (item) => item.sku !== sku,
  );

  saveItems(items);
}

export function updateQty(sku, qty) {
  const items = getItems();

  const product = items.find(
    (item) => item.sku === sku,
  );

  if (!product) return;

  product.quantity = Number(qty);

  if (product.quantity <= 0) {
    removeItem(sku);
    return;
  }

  saveItems(items);
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}

export function getTotals() {
  const items = getItems();

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const subtotal = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0,
  );

  return {
    totalItems,
    subtotal,
  };
}

export default {
  addItem,
  removeItem,
  updateQty,
  getItems,
  getTotals,
  clearCart,
};