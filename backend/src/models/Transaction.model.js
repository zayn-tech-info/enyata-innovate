const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Event ID is required']
    },
    circleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Circle',
        required: [true, 'Circle ID is required']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    type: {
        type: String,
        required: [true, 'Transaction type is required'],
        enum: {
            values: ['contribution', 'disbursement'],
            message: 'Type must be contribution or disbursement'
        }
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [1, 'Amount must be at least 1']
    },
    currency: {
        type: String,
        default: 'NGN'
    },
    iswReference: {
        type: String,
        trim: true,
        unique: true,
        sparse: true 
    },
    iswStatus: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending',
        required: true
    },
    failureReason: {
        type: String,
        trim: true
    },
    paidAt: Date,
    metadata: mongoose.Schema.Types.Mixed
}, {
    timestamps: true
});

// Pre-save hook to set paidAt date if status becomes success
TransactionSchema.pre('save', function(next) {
    if (this.isModified('status') && this.status === 'success' && !this.paidAt) {
        this.paidAt = new Date();
    }
    next();
});

// Static method to find by circle
TransactionSchema.statics.findByCircle = function(circleId) {
    return this.find({ circleId })
        .sort({ createdAt: -1 })
        .populate('userId', 'name email');
};

// Static method to get total collected
TransactionSchema.statics.getTotalCollected = async function(eventId) {
    const result = await this.aggregate([
        {
            $match: {
                eventId: new mongoose.Types.ObjectId(eventId),
                type: 'contribution',
                status: 'success'
            }
        },
        {
            $group: {
                _id: '$eventId',
                total: { $sum: '$amount' }
            }
        }
    ]);

    return result.length > 0 ? result[0].total : 0;
};

module.exports = mongoose.model('Transaction', TransactionSchema);
