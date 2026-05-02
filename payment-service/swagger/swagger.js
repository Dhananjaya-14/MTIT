module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'Payment Service API',
    version: '1.0.0',
    description: 'REST API for payments (validates order via order service)',
  },
  servers: [{ url: 'http://localhost:3004', description: 'Local' }],
  tags: [{ name: 'Payments', description: 'Payment processing' }],
  paths: {
    '/api/payments': {
      post: {
        summary: 'Create a payment for an order',
        tags: ['Payments'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PaymentInput' },
            },
          },
        },
        responses: {
          201: {
            description: 'Created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Payment' },
              },
            },
          },
          400: { description: 'Validation error' },
          502: { description: 'Order service unreachable' },
        },
      },
      get: {
        summary: 'List all payments',
        tags: ['Payments'],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Payment' },
                },
              },
            },
          },
        },
      },
    },
    '/api/payments/{id}': {
      get: {
        summary: 'Get payment by ID',
        tags: ['Payments'],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Payment' },
              },
            },
          },
          404: { description: 'Not found' },
        },
      },
      put: {
        summary: 'Update payment',
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
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Payment' },
              },
            },
          },
          400: { description: 'Validation error' },
          404: { description: 'Payment not found' },
          502: { description: 'Order service unreachable' },
        },
      },
      delete: {
        summary: 'Delete payment',
        tags: ['Payments'],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: {
          200: {
            description: 'Deleted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string' } },
                },
              },
            },
          },
          404: { description: 'Payment not found' },
        },
      },
    },
  },
  components: {
    schemas: {
      Payment: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          orderId: { type: 'string' },
          amount: { type: 'number' },
          paymentStatus: {
            type: 'string',
            enum: ['pending', 'completed', 'failed', 'refunded'],
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
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
