const { createProxyMiddleware } = require('http-proxy-middleware');

const PRODUCT = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001';
const CUSTOMER = process.env.CUSTOMER_SERVICE_URL || 'http://localhost:3002';
const ORDER = process.env.ORDER_SERVICE_URL || 'http://localhost:3003';
const PAYMENT = process.env.PAYMENT_SERVICE_URL || 'http://localhost:3004';

function proxyTo(target, pathRewrite) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: pathRewrite || undefined,
  });
}

function registerRoutes(app) {
  app.use('/api/products', proxyTo(PRODUCT));
  app.use('/api/customers', proxyTo(CUSTOMER));
  app.use('/api/orders', proxyTo(ORDER));
  app.use('/api/payments', proxyTo(PAYMENT));

  app.use('/product-docs', proxyTo(PRODUCT, { '^/product-docs': '/api-docs' }));
  app.use('/customer-docs', proxyTo(CUSTOMER, { '^/customer-docs': '/api-docs' }));
  app.use('/order-docs', proxyTo(ORDER, { '^/order-docs': '/api-docs' }));
  app.use('/payment-docs', proxyTo(PAYMENT, { '^/payment-docs': '/api-docs' }));
}

module.exports = registerRoutes;
