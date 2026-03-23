const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [60, 'Name cannot exceed 60 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [8, 'Password must be at least 8 characters'],
        maxlength: [128, 'Password cannot exceed 128 characters'],
        select: false
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
        trim: true,
        match: [
            /^(0|234|\+234)\d{10}$/,
            'Please add a valid Nigerian phone number'
        ]
    },
    bankAccount: {
        bankCode: {
            type: String,
            required: function() { return this.bankAccount && (this.bankAccount.accountNumber || this.bankAccount.accountName); }
        },
        accountNumber: {
            type: String,
            required: function() { return this.bankAccount && (this.bankAccount.bankCode || this.bankAccount.accountName); },
            validate: {
                validator: function(v) {
                    return /^\d{10}$/.test(v);
                },
                message: props => `${props.value} is not a valid 10-digit account number!`
            }
        },
        accountName: {
            type: String,
            required: function() { return this.bankAccount && (this.bankAccount.bankCode || this.bankAccount.accountNumber); },
            trim: true
        }
    },
    role: {
        type: String,
        enum: ['member', 'admin'],
        default: 'member'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

 
UserSchema.statics.findByEmail = function(email) {
    return this.findOne({ email }).select('+password');
};

module.exports = mongoose.model('User', UserSchema);
