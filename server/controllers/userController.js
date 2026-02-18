const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Private
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find({ company: req.user.company }).select('-password');

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create new user
// @route   POST /api/users
// @access  Private (Admin only - for now just Private)
exports.createUser = async (req, res, next) => {
    try {
        const { name, email, password, role, team } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ success: false, error: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'User',
            team: team || 'General',
            company: req.user.company,
            status: 'Active' // Default status
        });

        // Remove password from response
        user.password = undefined;

        res.status(201).json({
            success: true,
            data: user,
        });
    } catch (err) {
        next(err);
    }
};
