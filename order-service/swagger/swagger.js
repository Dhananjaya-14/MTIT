module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'Order Service API',
    version: '1.0.0',
    description:
      'REST API for orders. Creates orders after validating product & customer via other services.',
  },
  servers: [{ url: 'http://localhost:3003', description: 'Local' }],
  tags: [{ name: 'Orders', description: 'Order creation & retrieval' }],
  paths: {
    '/api/orders': {
      post: {
        summary: 'Create an order',
        tags: ['Orders'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/OrderInput' },
            },
          },
        },
        responses: {
          201: {
            description: 'Created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Order' },
              },
            },
          },
          400: { description: 'Validation or upstream error' },
          502: { description: 'Product or customer service unreachable' },
        },
      },
      get: {
        summary: 'List all orders',
        tags: ['Orders'],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Order' },
                },
              },
            },
          },
        },
      },
    },
    '/api/orders/{id}': {
      get: {
        summary: 'Get order by ID',
        tags: ['Orders'],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Order' },
              },
            },
          },
          404: { description: 'Not found' },
        },
      },
      put: {
        summary: 'Update order (re-validates product & customer, recalculates total)',
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
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Order' },
              },
            },
          },
          400: { description: 'Validation or upstream error' },
          404: { description: 'Order not found' },
          502: { description: 'Product or customer service unreachable' },
        },
      },
    },
  },
  components: {
    schemas: {
      Order: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          customerId: { type: 'string' },
          productId: { type: 'string' },
          quantity: { type: 'number' },
          totalPrice: { type: 'number' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
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
    },
  },
};
