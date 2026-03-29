module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'Customer Service API',
    version: '1.0.0',
    description: 'REST API for customers (microservice)',
  },
  servers: [{ url: 'http://localhost:3002', description: 'Local' }],
  tags: [{ name: 'Customers', description: 'Customer CRUD' }],
  paths: {
    '/api/customers': {
      post: {
        summary: 'Create a customer',
        tags: ['Customers'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CustomerInput' },
            },
          },
        },
        responses: {
          201: {
            description: 'Created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Customer' },
              },
            },
          },
          400: { description: 'Validation error' },
        },
      },
      get: {
        summary: 'List all customers',
        tags: ['Customers'],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Customer' },
                },
              },
            },
          },
        },
      },
    },
    '/api/customers/{id}': {
      get: {
        summary: 'Get customer by ID',
        tags: ['Customers'],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Customer' },
              },
            },
          },
          404: { description: 'Not found' },
        },
      },
      put: {
        summary: 'Update customer',
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
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Customer' },
              },
            },
          },
          404: { description: 'Not found' },
        },
      },
      delete: {
        summary: 'Delete customer',
        tags: ['Customers'],
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
                  properties: {
                    message: { type: 'string' },
                    customer: { $ref: '#/components/schemas/Customer' },
                  },
                },
              },
            },
          },
          404: { description: 'Not found' },
        },
      },
    },
  },
  components: {
    schemas: {
      Customer: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' },
          address: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
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
    },
  },
};
