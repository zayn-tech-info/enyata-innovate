const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    // Transaction fields
});

module.exports = mongoose.model('Transaction', TransactionSchema);
