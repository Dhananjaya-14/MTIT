const mongoose = require('mongoose');
const axios = require('axios');
const Payment = require('../models/paymentModel');
const { fetchOrder } = require('../services/orderClient');

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// POST /api/payments
exports.createPayment = async (req, res) => {
  try {
    const { orderId, amount, paymentStatus } = req.body;
    if (!orderId || amount == null) {
      return res.status(400).json({ message: 'orderId and amount are required' });
    }
    if (!isValidObjectId(orderId)) {
      return res.status(400).json({ message: 'Invalid orderId' });
    }

    let order;
    try {
      order = await fetchOrder(orderId);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          return res.status(400).json({ message: 'Order does not exist' });
        }
        return res.status(502).json({
          message: 'Could not reach order service',
          detail: err.message,
        });
      }
      throw err;
    }

    if (Math.abs(amount - order.totalPrice) > 0.01) {
      return res.status(400).json({
        message: `amount must match order totalPrice (${order.totalPrice})`,
      });
    }

    const payment = await Payment.create({
      orderId,
      amount,
      paymentStatus: paymentStatus || 'pending',
    });
    res.status(201).json(payment);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

// GET /api/payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

// GET /api/payments/:id
exports.getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid payment id' });
    }
    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

// PUT /api/payments/:id
exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid payment id' });
    }

    const existing = await Payment.findById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    const { orderId, amount, paymentStatus } = req.body;
    const touchesOrder = orderId != null || amount != null;

    if (!touchesOrder && paymentStatus == null) {
      return res.status(400).json({
        message: 'Send paymentStatus and/or orderId and/or amount to update',
      });
    }

    if (!touchesOrder) {
      const updated = await Payment.findByIdAndUpdate(
        id,
        { paymentStatus },
        { new: true, runValidators: true }
      );
      return res.json(updated);
    }

    const effectiveOrderId = orderId != null ? orderId : existing.orderId;
    const effectiveAmount = amount != null ? amount : existing.amount;

    if (!isValidObjectId(effectiveOrderId)) {
      return res.status(400).json({ message: 'Invalid orderId' });
    }

    let order;
    try {
      order = await fetchOrder(effectiveOrderId.toString());
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          return res.status(400).json({ message: 'Order does not exist' });
        }
        return res.status(502).json({
          message: 'Could not reach order service',
          detail: err.message,
        });
      }
      throw err;
    }

    if (Math.abs(effectiveAmount - order.totalPrice) > 0.01) {
      return res.status(400).json({
        message: `amount must match order totalPrice (${order.totalPrice})`,
      });
    }

    const payload = {
      orderId: effectiveOrderId,
      amount: effectiveAmount,
    };
    if (paymentStatus != null) {
      payload.paymentStatus = paymentStatus;
    }

    const updated = await Payment.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    res.json(updated);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

// DELETE /api/payments/:id
exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid payment id' });
    }
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json({ message: 'Payment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};
