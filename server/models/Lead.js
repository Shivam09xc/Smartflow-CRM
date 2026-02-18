const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
    },
    organization: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    phone: {
        type: String,
    },
    source: {
        type: String,
        enum: ['Website', 'Referral', 'Social Media', 'Cold Call', 'Other'],
        default: 'Website',
    },
    value: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Qualified', 'Lost', 'Converted'],
        default: 'New',
    },
    assignedTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    assignedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    team: {
        type: mongoose.Schema.ObjectId,
        ref: 'Team',
    },
    notes: [{
        text: String,
        date: { type: Date, default: Date.now },
        author: { type: mongoose.Schema.ObjectId, ref: 'User' }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Lead', LeadSchema);
