const Deal = require('../models/Deal');

// @desc    Get all deals
// @route   GET /api/deals
// @access  Private
exports.getDeals = async (req, res, next) => {
    try {
        const deals = await Deal.find({ company: req.user.company });

        res.status(200).json({
            success: true,
            count: deals.length,
            data: deals,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create new deal
// @route   POST /api/deals
// @access  Private
exports.createDeal = async (req, res, next) => {
    try {
        req.body.company = req.user.company;

        const deal = await Deal.create(req.body);

        res.status(201).json({
            success: true,
            data: deal,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update deal
// @route   PUT /api/deals/:id
// @access  Private
exports.updateDeal = async (req, res, next) => {
    try {
        let deal = await Deal.findById(req.params.id);

        if (!deal) {
            return res.status(404).json({ success: false, error: 'Deal not found' });
        }

        if (deal.company.toString() !== req.user.company.toString()) {
            return res.status(403).json({ success: false, error: 'Not authorized' });
        }

        deal = await Deal.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: deal,
        });
    } catch (err) {
        next(err);
    }
};
