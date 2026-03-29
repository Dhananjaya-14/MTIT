const { createProxyMiddleware } = require('http-proxy-middleware');

const PRODUCT = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001';
const CUSTOMER = process.env.CUSTOMER_SERVICE_URL || 'http://localhost:3002';
const ORDER = process.env.ORDER_SERVICE_URL || 'http://localhost:3003';
const PAYMENT = process.env.PAYMENT_SERVICE_URL || 'http://localhost:3004';

/** Use pathFilter (not app.use mount path): Express strips mount paths, which made the proxy hit upstream `/` instead of `/api/...`. */
function proxyTo(target, pathFilter, pathRewrite) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathFilter,
    pathRewrite: pathRewrite || undefined,
  });
}

function registerRoutes(app) {
  app.use(proxyTo(PRODUCT, '/api/products'));
  app.use(proxyTo(CUSTOMER, '/api/customers'));
  app.use(proxyTo(ORDER, '/api/orders'));
  app.use(proxyTo(PAYMENT, '/api/payments'));

  app.use(proxyTo(PRODUCT, '/product-docs', { '^/product-docs': '/api-docs' }));
  app.use(proxyTo(CUSTOMER, '/customer-docs', { '^/customer-docs': '/api-docs' }));
  app.use(proxyTo(ORDER, '/order-docs', { '^/order-docs': '/api-docs' }));
  app.use(proxyTo(PAYMENT, '/payment-docs', { '^/payment-docs': '/api-docs' }));
}

module.exports = registerRoutes;
