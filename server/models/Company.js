const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a company name'],
        trim: true,
    },
    subscription_plan: {
        type: String,
        enum: ['Free', 'Pro', 'Enterprise'],
        default: 'Free',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Company', CompanySchema);
