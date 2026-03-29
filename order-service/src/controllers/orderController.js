const mongoose = require('mongoose');
const axios = require('axios');
const Order = require('../models/orderModel');
const { fetchProduct, fetchCustomer } = require('../services/upstream');

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const { customerId, productId, quantity, totalPrice } = req.body;
    if (!customerId || !productId || quantity == null) {
      return res.status(400).json({ message: 'customerId, productId, and quantity are required' });
    }
    if (!isValidObjectId(customerId) || !isValidObjectId(productId)) {
      return res.status(400).json({ message: 'Invalid customerId or productId' });
    }

    let product;
    let customer;
    try {
      [product, customer] = await Promise.all([
        fetchProduct(productId),
        fetchCustomer(customerId),
      ]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 404) {
          return res.status(400).json({
            message: 'Referenced product or customer does not exist',
          });
        }
        return res.status(502).json({
          message: 'Could not reach product or customer service',
          detail: err.message,
        });
      }
      throw err;
    }

    if (quantity > product.quantity) {
      return res.status(400).json({
        message: `Insufficient stock. Available: ${product.quantity}`,
      });
    }

    const computedTotal = product.price * quantity;
    if (totalPrice != null && Math.abs(totalPrice - computedTotal) > 0.01) {
      return res.status(400).json({
        message: `totalPrice must equal price × quantity (${computedTotal})`,
        expectedTotal: computedTotal,
      });
    }

    const order = await Order.create({
      customerId,
      productId,
      quantity,
      totalPrice: computedTotal,
    });
    res.status(201).json(order);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

// GET /api/orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

// GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid order id' });
    }
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

// PUT /api/orders/:id
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid order id' });
    }

    const existing = await Order.findById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const { customerId, productId, quantity, totalPrice } = req.body;
    const effectiveCustomerId = customerId != null ? customerId : existing.customerId;
    const effectiveProductId = productId != null ? productId : existing.productId;
    const effectiveQuantity = quantity != null ? quantity : existing.quantity;

    if (!isValidObjectId(effectiveCustomerId) || !isValidObjectId(effectiveProductId)) {
      return res.status(400).json({ message: 'Invalid customerId or productId' });
    }

    let product;
    let customer;
    try {
      [product, customer] = await Promise.all([
        fetchProduct(effectiveProductId.toString()),
        fetchCustomer(effectiveCustomerId.toString()),
      ]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 404) {
          return res.status(400).json({
            message: 'Referenced product or customer does not exist',
          });
        }
        return res.status(502).json({
          message: 'Could not reach product or customer service',
          detail: err.message,
        });
      }
      throw err;
    }

    if (effectiveQuantity > product.quantity) {
      return res.status(400).json({
        message: `Insufficient stock. Available: ${product.quantity}`,
      });
    }

    const computedTotal = product.price * effectiveQuantity;
    if (totalPrice != null && Math.abs(totalPrice - computedTotal) > 0.01) {
      return res.status(400).json({
        message: `totalPrice must equal price × quantity (${computedTotal})`,
        expectedTotal: computedTotal,
      });
    }

    const updated = await Order.findByIdAndUpdate(
      id,
      {
        customerId: effectiveCustomerId,
        productId: effectiveProductId,
        quantity: effectiveQuantity,
        totalPrice: computedTotal,
      },
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message || 'Server error' });
  }
};
