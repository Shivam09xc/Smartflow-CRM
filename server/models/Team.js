const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Please add a team name'],
        trim: true,
    },
    leader: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    members: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Team', TeamSchema);
