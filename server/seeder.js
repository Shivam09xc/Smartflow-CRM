const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Company = require('./models/Company');
const Lead = require('./models/Lead');
const Deal = require('./models/Deal');
const connectDB = require('./config/db');

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data to avoid duplicates (optional, be careful in prod)
        // await User.deleteMany();
        // await Company.deleteMany();
        // await Lead.deleteMany();
        // await Deal.deleteMany();

        // Check if admin exists
        let user = await User.findOne({ email: 'admin@smartflow.com' });
        let company;

        if (user) {
            console.log('Admin user exists. Using existing user/company.');
            company = await Company.findById(user.company);
        } else {
            console.log('Creating new Admin and Company...');
            // Create Company
            company = await Company.create({
                name: 'SmartFlow HQ',
                subscription_plan: 'Enterprise'
            });

            // Create Admin User
            user = await User.create({
                name: 'Super Admin',
                email: 'admin@smartflow.com',
                password: 'password123',
                role: 'super-admin',
                company: company._id
            });
        }

        // Check if we have leads, if not, create them
        const leadCount = await Lead.countDocuments();
        if (leadCount === 0) {
            console.log('Seeding Leads...');
            const leads = await Lead.create([
                {
                    company: company._id,
                    name: 'John Doe',
                    email: 'john@example.com',
                    phone: '555-0100',
                    source: 'Website',
                    status: 'New',
                    assignedTo: user._id,
                    value: 5000
                },
                {
                    company: company._id,
                    name: 'Jane Smith',
                    email: 'jane@designco.com',
                    phone: '555-0101',
                    source: 'Referral',
                    status: 'Qualified',
                    assignedTo: user._id,
                    value: 12000
                },
                {
                    company: company._id,
                    name: 'Acme Corp Inquiry',
                    email: 'contact@acme.com',
                    phone: '555-0102',
                    source: 'Cold Call',
                    status: 'Contacted',
                    assignedTo: user._id,
                    value: 3500
                }
            ]);

            console.log('Seeding Deals...');
            await Deal.create([
                {
                    company: company._id,
                    title: 'Website Redesign',
                    value: 15000,
                    stage: 'Proposal',
                    probability: 60,
                    lead: leads[1]._id,
                    assignedTo: user._id
                },
                {
                    company: company._id,
                    title: 'SEO Package',
                    value: 5000,
                    stage: 'Prospect',
                    probability: 20,
                    lead: leads[0]._id,
                    assignedTo: user._id
                }
            ]);
        } else {
            console.log('Leads already exist. Skipping seeding.');
        }

        console.log('Data Seeding Completed!');
        process.exit();

    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
