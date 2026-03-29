const axios = require('axios');

const ORDER_BASE = process.env.ORDER_SERVICE_URL || 'http://localhost:3003';

async function fetchOrder(orderId) {
  const { data } = await axios.get(`${ORDER_BASE}/api/orders/${orderId}`);
  return data;
}

module.exports = { fetchOrder };
