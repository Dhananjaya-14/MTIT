/** OpenAPI 3 spec for Swagger UI (no runtime JSDoc parsing). */
module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'Product Service API',
    version: '1.0.0',
    description: 'REST API for product management (microservice)',
  },
  servers: [{ url: 'http://localhost:3001', description: 'Local' }],
  tags: [{ name: 'Products', description: 'Product CRUD' }],
  paths: {
    '/api/products': {
      post: {
        summary: 'Create a product',
        tags: ['Products'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ProductInput' },
            },
          },
        },
        responses: {
          201: {
            description: 'Created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Product' },
              },
            },
          },
          400: { description: 'Validation error' },
        },
      },
      get: {
        summary: 'List all products',
        tags: ['Products'],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Product' },
                },
              },
            },
          },
        },
      },
    },
    '/api/products/{id}': {
      get: {
        summary: 'Get product by ID',
        tags: ['Products'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Product' },
              },
            },
          },
          404: { description: 'Not found' },
        },
      },
      put: {
        summary: 'Update product',
        tags: ['Products'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ProductInputPartial' },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Product' },
              },
            },
          },
          404: { description: 'Not found' },
        },
      },
      delete: {
        summary: 'Delete product',
        tags: ['Products'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'Deleted' },
          404: { description: 'Not found' },
        },
      },
    },
  },
  components: {
    schemas: {
      Product: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          price: { type: 'number' },
          quantity: { type: 'number' },
          description: { type: 'string' },
          image: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
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
    },
  },
};
