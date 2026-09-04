export function getProfile() {
  return {
    name: 'Kutikanti Sreelekha',
    email: 'kutikanti.sreelekha@example.com',
  };
}

export function getOrders() {
  return JSON.parse(
    localStorage.getItem('orders')
  ) || [];
}