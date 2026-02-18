const Team = require('../models/Team');

// @desc    Get all teams
// @route   GET /api/teams
// @access  Private
exports.getTeams = async (req, res, next) => {
    try {
        const teams = await Team.find({ company: req.user.company }).populate('leader', 'name').populate('members', 'name');

        res.status(200).json({
            success: true,
            count: teams.length,
            data: teams,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create new team
// @route   POST /api/teams
// @access  Private
exports.createTeam = async (req, res, next) => {
    try {
        req.body.company = req.user.company;

        const team = await Team.create(req.body);

        res.status(201).json({
            success: true,
            data: team,
        });
    } catch (err) {
        next(err);
    }
};
