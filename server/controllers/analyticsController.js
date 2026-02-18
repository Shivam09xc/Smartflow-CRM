const Lead = require('../models/Lead');
const Deal = require('../models/Deal');
const Task = require('../models/Task');
const User = require('../models/User');

// @desc    Get dashboard statistics
// @route   GET /api/analytics/dashboard
// @access  Private
exports.getDashboardStats = async (req, res) => {
    try {
        const companyId = req.user.company;

        // 1. Total Leads
        const totalLeads = await Lead.countDocuments({ company: companyId });

        // 2. Active Deals (Not Won or Lost - assuming 'Won' and 'Lost' are final stages)
        // Adjust based on your DealStage enum: PROSPECT, QUALIFIED, PROPOSAL, NEGOTIATION, WON.
        // We'll consider everything except WON (and maybe LOST if you have it) as active? 
        // Or just count all deals? Let's count all non-won deals as "Active" for now.
        const activeDealsCount = await Deal.countDocuments({
            company: companyId,
            stage: { $ne: 'Won' }
        });

        // 3. Pipeline Value (Sum of value of all deals)
        const deals = await Deal.find({ company: companyId }); // Fetch all to sum value
        const pipelineValue = deals.reduce((acc, deal) => acc + (deal.value || 0), 0);

        // 4. Won Deals Count (Converted)
        const wonDealsCount = await Deal.countDocuments({ company: companyId, stage: 'Won' });

        // 5. Conversion Rate (Won / Total Deals) * 100
        const totalDeals = deals.length;
        const conversionRate = totalDeals > 0 ? ((wonDealsCount / totalDeals) * 100).toFixed(1) : 0;

        // 6. Recent Activity (Latest 5 leads)
        // const recentLeads = await Lead.find({ company: companyId })
        //    .sort({ createdAt: -1 })
        //    .limit(5);

        res.status(200).json({
            success: true,
            data: {
                totalLeads,
                activeDeals: activeDealsCount,
                pipelineValue,
                conversionRate: `${conversionRate}%`,
                wonDeals: wonDealsCount
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
