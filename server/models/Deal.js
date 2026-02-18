const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Please add a deal title'],
        trim: true,
    },
    value: {
        type: Number,
        required: [true, 'Please add a deal value'],
    },
    stage: {
        type: String,
        enum: ['Prospect', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'],
        default: 'Prospect',
    },
    probability: {
        type: Number,
        min: 0,
        max: 100,
    },
    closingDate: {
        type: Date,
    },
    lead: {
        type: mongoose.Schema.ObjectId,
        ref: 'Lead',
    },
    assignedTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Deal', DealSchema);
