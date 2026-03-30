const { createProxyMiddleware } = require('http-proxy-middleware');

const PRODUCT = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001';
const CUSTOMER = process.env.CUSTOMER_SERVICE_URL || 'http://localhost:3002';
const ORDER = process.env.ORDER_SERVICE_URL || 'http://localhost:3003';
const PAYMENT = process.env.PAYMENT_SERVICE_URL || 'http://localhost:3004';

function proxyTo(pathFilter, target, pathRewrite) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: pathRewrite || undefined,
  });
}

function registerRoutes(app) {
  app.use('/api/products', createProxyMiddleware({ target: PRODUCT, changeOrigin: true, pathRewrite: (path, req) => req.originalUrl }));
  app.use('/api/customers', createProxyMiddleware({ target: CUSTOMER, changeOrigin: true, pathRewrite: (path, req) => req.originalUrl }));
  app.use('/api/orders', createProxyMiddleware({ target: ORDER, changeOrigin: true, pathRewrite: (path, req) => req.originalUrl }));
  app.use('/api/payments', createProxyMiddleware({ target: PAYMENT, changeOrigin: true, pathRewrite: (path, req) => req.originalUrl }));

  app.use('/product-docs', createProxyMiddleware({ target: PRODUCT, changeOrigin: true, pathRewrite: { '^/product-docs': '/api-docs' } }));
  app.use('/customer-docs', createProxyMiddleware({ target: CUSTOMER, changeOrigin: true, pathRewrite: { '^/customer-docs': '/api-docs' } }));
  app.use('/order-docs', createProxyMiddleware({ target: ORDER, changeOrigin: true, pathRewrite: { '^/order-docs': '/api-docs' } }));
  app.use('/payment-docs', createProxyMiddleware({ target: PAYMENT, changeOrigin: true, pathRewrite: { '^/payment-docs': '/api-docs' } }));
}

module.exports = registerRoutes;
