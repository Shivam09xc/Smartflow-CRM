const express = require('express');
const {
    getTeams,
    createTeam
} = require('../controllers/teamController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router
    .route('/')
    .get(getTeams)
    .post(createTeam);

module.exports = router;
