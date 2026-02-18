const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Please add a task title'],
        trim: true,
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium',
    },
    relatedEntity: {
        type: String,
        trim: true,
    },
    relatedType: {
        type: String,
        enum: ['Lead', 'Deal', 'General'],
        default: 'General',
    },
    relatedId: {
        type: mongoose.Schema.ObjectId,
        // Dynamic ref is tricky in Mongoose simple schemas, usually handled by populating based on relatedType or keeping separate fields
        // For simplicity, we keep the ID and handle population manually or store separate fields if needed.
        // Let's store direct references optionally
        refPath: 'relatedType'
    },
    dueDate: {
        type: Date,
    },
    assignedTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Task', TaskSchema);
