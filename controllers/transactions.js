const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    return res.send(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Add all transactions
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    // console.log(error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(
        (value) => value.message
      );

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.send(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// @desc    Delete all transactions
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
  res.send('DELETE transactions');
};