const axios = require('axios');

const PRODUCT_BASE = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001';
const CUSTOMER_BASE = process.env.CUSTOMER_SERVICE_URL || 'http://localhost:3002';

async function fetchProduct(productId) {
  const { data } = await axios.get(`${PRODUCT_BASE}/api/products/${productId}`);
  return data;
}

async function fetchCustomer(customerId) {
  const { data } = await axios.get(`${CUSTOMER_BASE}/api/customers/${customerId}`);
  return data;
}

module.exports = { fetchProduct, fetchCustomer };
