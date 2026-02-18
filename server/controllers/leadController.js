const Lead = require('../models/Lead');

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
exports.getLeads = async (req, res, next) => {
    try {
        let query;

        // RBAC: Logic to filter leads based on role
        // For now, return all leads for the company
        const reqQuery = { company: req.user.company };

        if (req.user.role === 'associate') {
            reqQuery.assignedTo = req.user.id;
        }
        // Add more RBAC logic here for Team Leader etc.

        query = Lead.find(reqQuery).populate('assignedTo', 'name');

        const leads = await query;

        res.status(200).json({
            success: true,
            count: leads.length,
            data: leads,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single lead
// @route   GET /api/leads/:id
// @access  Private
exports.getLead = async (req, res, next) => {
    try {
        const lead = await Lead.findById(req.params.id).populate('assignedTo', 'name');

        if (!lead) {
            return res.status(404).json({ success: false, error: 'Lead not found' });
        }

        // Check company access
        if (lead.company.toString() !== req.user.company.toString()) {
            return res.status(403).json({ success: false, error: 'Not authorized' });
        }

        res.status(200).json({
            success: true,
            data: lead,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create new lead
// @route   POST /api/leads
// @access  Private
exports.createLead = async (req, res, next) => {
    try {
        // Add company and user to body
        req.body.company = req.user.company;
        req.body.assignedBy = req.user.id;

        const lead = await Lead.create(req.body);

        res.status(201).json({
            success: true,
            data: lead,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Private
exports.updateLead = async (req, res, next) => {
    try {
        let lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ success: false, error: 'Lead not found' });
        }

        // Check company access
        if (lead.company.toString() !== req.user.company.toString()) {
            return res.status(403).json({ success: false, error: 'Not authorized' });
        }

        lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: lead,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private
exports.deleteLead = async (req, res, next) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ success: false, error: 'Lead not found' });
        }

        // Check company access
        if (lead.company.toString() !== req.user.company.toString()) {
            return res.status(403).json({ success: false, error: 'Not authorized' });
        }

        await lead.remove();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        next(err);
    }
};
