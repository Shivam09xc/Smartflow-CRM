const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        let mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/smartflow-crm';
        let isInMemory = false;

        // Try connecting to local MongoDB first
        try {
            await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
            console.log(`MongoDB Connected (Local): ${mongoose.connection.host}`);
        } catch (localError) {
            console.log('Local MongoDB not found. Starting In-Memory Database...');

            // Start In-Memory Database
            const mongod = await MongoMemoryServer.create();
            mongoUri = mongod.getUri();
            isInMemory = true;

            const conn = await mongoose.connect(mongoUri);
            console.log(`MongoDB Connected (In-Memory): ${conn.connection.host}`);
        }

        // Auto-seed Admin User if using In-Memory or if it doesn't exist
        const User = require('../models/User');
        const admin = await User.findOne({ email: 'admin@smartflow.com' });

        if (!admin) {
            console.log('Seeding Database with Admin User...');
            const Company = require('../models/Company');

            // Create or find company
            let company = await Company.findOne({ name: 'SmartFlow HQ' });
            if (!company) {
                company = await Company.create({
                    name: 'SmartFlow HQ',
                    subscription_plan: 'Enterprise'
                });
            }

            await User.create({
                name: 'Super Admin',
                email: 'admin@smartflow.com',
                password: 'password123',
                role: 'super-admin',
                company: company._id,
                status: 'Active'
            });
            console.log('>>> Admin User Created: admin@smartflow.com / password123 <<<');

            // Seed Demo Data for the Admin
            const Lead = require('../models/Lead');
            const Deal = require('../models/Deal');
            const Task = require('../models/Task');

            const adminUser = await User.findOne({ email: 'admin@smartflow.com' });

            // Create Leads
            const leads = await Lead.create([
                { company: company._id, name: 'John Doe', email: 'john@example.com', phone: '555-0100', source: 'Website', status: 'New', assignedTo: adminUser._id, value: 5000 },
                { company: company._id, name: 'Jane Smith', email: 'jane@designco.com', phone: '555-0101', source: 'Referral', status: 'Qualified', assignedTo: adminUser._id, value: 12000 },
                { company: company._id, name: 'Acme Corp', email: 'contact@acme.com', source: 'Cold Call', status: 'Contacted', assignedTo: adminUser._id, value: 3500 }
            ]);

            // Create Deals
            await Deal.create([
                { company: company._id, title: 'Website Redesign', value: 15000, stage: 'Proposal', probability: 60, lead: leads[1]._id, assignedTo: adminUser._id },
                { company: company._id, title: 'SEO Package', value: 5000, stage: 'Prospect', probability: 20, lead: leads[0]._id, assignedTo: adminUser._id }
            ]);

            // Create Tasks
            await Task.create([
                { company: company._id, title: 'Follow up with Jane', priority: 'High', relatedEntity: 'Jane Smith', dueDate: new Date(Date.now() + 86400000), status: 'To Do' },
                { company: company._id, title: 'Send proposal to Acme', priority: 'Medium', relatedEntity: 'Acme Corp', dueDate: new Date(Date.now() + 172800000), status: 'In Progress' }
            ]);

            console.log('>>> Demo Data (Leads, Deals, Tasks) Seeded <<<');
        }

    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Do not exit process, keep trying or let the app run without DB (though it will fail on requests)
    }
};

module.exports = connectDB;
