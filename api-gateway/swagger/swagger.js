module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'API Gateway',
    version: '1.0.0',
    description: 'Single entry point for e-commerce microservices',
  },
  servers: [{ url: 'http://localhost:5000', description: 'Local' }],
  tags: [
    { name: 'Products', description: 'Product service routes' },
    { name: 'Customers', description: 'Customer service routes' },
    { name: 'Orders', description: 'Order service routes' },
    { name: 'Payments', description: 'Payment service routes' },
    { name: 'Service Docs', description: 'Proxy routes to each service Swagger UI' },
  ],
  paths: {
    '/api/products': {
      get: {
        summary: 'Proxy to product-service product list endpoint',
        tags: ['Products'],
        responses: { 200: { description: 'Proxied response from product service' } },
      },
      post: {
        summary: 'Proxy to product-service create product endpoint',
        tags: ['Products'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ProductInput' },
            },
          },
        },
        responses: { 201: { description: 'Proxied response from product service' } },
      },
    },
    '/api/products/{id}': {
      get: {
        summary: 'Proxy to product-service get product endpoint',
        tags: ['Products'],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: { 200: { description: 'Proxied response from product service' } },
      },
      put: {
        summary: 'Proxy to product-service update product endpoint',
        tags: ['Products'],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ProductInputPartial' },
            },
          },
        },
        responses: { 200: { description: 'Proxied response from product service' } },
      },
      delete: {
        summary: 'Proxy to product-service delete product endpoint',
        tags: ['Products'],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: { 200: { description: 'Proxied response from product service' } },
      },
    },
    '/api/customers': {
      get: {
        summary: 'Proxy to customer-service customer list endpoint',
        tags: ['Customers'],
        responses: { 200: { description: 'Proxied response from customer service' } },
      },
      post: {
        summary: 'Proxy to customer-service create customer endpoint',
        tags: ['Customers'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CustomerInput' },
            },
          },
        },
        responses: { 201: { description: 'Proxied response from customer service' } },
      },
    },
    '/api/customers/{id}': {
      get: {
        summary: 'Proxy to customer-service get customer endpoint',
        tags: ['Customers'],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: { 200: { description: 'Proxied response from customer service' } },
      },
      put: {
        summary: 'Proxy to customer-service update customer endpoint',
        tags: ['Customers'],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CustomerInputPartial' },
            },
          },
        },
        responses: { 200: { description: 'Proxied response from customer service' } },
      },
      delete: {
        summary: 'Proxy to customer-service delete customer endpoint',
        tags: ['Customers'],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: { 200: { description: 'Proxied response from customer service' } },
      },
    },
    '/api/orders': {
      get: {
        summary: 'Proxy to order-service order list endpoint',
        tags: ['Orders'],
        responses: { 200: { description: 'Proxied response from order service' } },
      },
      post: {
        summary: 'Proxy to order-service create order endpoint',
        tags: ['Orders'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/OrderInput' },
            },
          },
        },
        responses: { 201: { description: 'Proxied response from order service' } },
      },
    },
    '/api/orders/{id}': {
      get: {
        summary: 'Proxy to order-service get order endpoint',
        tags: ['Orders'],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: { 200: { description: 'Proxied response from order service' } },
      },
      put: {
        summary: 'Proxy to order-service update order endpoint',
        tags: ['Orders'],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/OrderUpdate' },
            },
          },
        },
        responses: { 200: { description: 'Proxied response from order service' } },
      },
      delete: {
        summary: 'Proxy to order-service delete order endpoint',
        tags: ['Orders'],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: { 200: { description: 'Proxied response from order service' } },
      },
    },
    '/api/payments': {
      get: {
        summary: 'Proxy to payment-service payment list endpoint',
        tags: ['Payments'],
        responses: { 200: { description: 'Proxied response from payment service' } },
      },
      post: {
        summary: 'Proxy to payment-service create payment endpoint',
        tags: ['Payments'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PaymentInput' },
            },
          },
        },
        responses: { 201: { description: 'Proxied response from payment service' } },
      },
    },
    '/api/payments/{id}': {
      get: {
        summary: 'Proxy to payment-service get payment endpoint',
        tags: ['Payments'],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: { 200: { description: 'Proxied response from payment service' } },
      },
      put: {
        summary: 'Proxy to payment-service update payment endpoint',
        tags: ['Payments'],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PaymentUpdate' },
            },
          },
        },
        responses: { 200: { description: 'Proxied response from payment service' } },
      },
      delete: {
        summary: 'Proxy to payment-service delete payment endpoint',
        tags: ['Payments'],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: { 200: { description: 'Proxied response from payment service' } },
      },
    },
    '/product-docs': {
      get: {
        summary: 'Proxy to product-service Swagger UI',
        tags: ['Service Docs'],
        responses: { 200: { description: 'Product service Swagger UI' } },
      },
    },
    '/customer-docs': {
      get: {
        summary: 'Proxy to customer-service Swagger UI',
        tags: ['Service Docs'],
        responses: { 200: { description: 'Customer service Swagger UI' } },
      },
    },
    '/order-docs': {
      get: {
        summary: 'Proxy to order-service Swagger UI',
        tags: ['Service Docs'],
        responses: { 200: { description: 'Order service Swagger UI' } },
      },
    },
    '/payment-docs': {
      get: {
        summary: 'Proxy to payment-service Swagger UI',
        tags: ['Service Docs'],
        responses: { 200: { description: 'Payment service Swagger UI' } },
      },
    },
  },
  components: {
    schemas: {
      ProductInput: {
        type: 'object',
        required: ['name', 'price', 'quantity'],
        properties: {
          name: { type: 'string', example: 'Laptop' },
          price: { type: 'number', example: 1500 },
          quantity: { type: 'number', example: 10 },
          description: { type: 'string', example: 'Gaming laptop' },
          image: { type: 'string', example: 'https://example.com/laptop.jpg' },
        },
      },
      ProductInputPartial: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          price: { type: 'number' },
          quantity: { type: 'number' },
          description: { type: 'string' },
          image: { type: 'string' },
        },
      },
      CustomerInput: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string', example: 'Jane Doe' },
          email: { type: 'string', example: 'jane@example.com' },
          address: { type: 'string', example: '123 Main St' },
        },
      },
      CustomerInputPartial: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          address: { type: 'string' },
        },
      },
      OrderInput: {
        type: 'object',
        required: ['customerId', 'productId', 'quantity'],
        properties: {
          customerId: { type: 'string', example: '507f1f77bcf86cd799439011' },
          productId: { type: 'string', example: '507f191e810c19729de860ea' },
          quantity: { type: 'number', example: 2 },
          totalPrice: {
            type: 'number',
            description: 'Optional; must match product.price × quantity if sent',
            example: 3000,
          },
        },
      },
      OrderUpdate: {
        type: 'object',
        description:
          'All fields optional; omitted fields keep existing values. totalPrice must match price × quantity if sent.',
        properties: {
          customerId: { type: 'string' },
          productId: { type: 'string' },
          quantity: { type: 'number', example: 3 },
          totalPrice: { type: 'number' },
        },
      },
      PaymentInput: {
        type: 'object',
        required: ['orderId', 'amount'],
        properties: {
          orderId: { type: 'string', example: '507f1f77bcf86cd799439011' },
          amount: { type: 'number', example: 3000 },
          paymentStatus: {
            type: 'string',
            enum: ['pending', 'completed', 'failed', 'refunded'],
            example: 'completed',
          },
        },
      },
      PaymentUpdate: {
        type: 'object',
        description:
          'Partial update. If you change orderId or amount, amount must match that order totalPrice. paymentStatus alone is allowed without re-validating the order.',
        properties: {
          orderId: { type: 'string' },
          amount: { type: 'number' },
          paymentStatus: {
            type: 'string',
            enum: ['pending', 'completed', 'failed', 'refunded'],
          },
        },
      },
    },
  },
};
