const express = require('express');
const {
    getLeads,
    getLead,
    createLead,
    updateLead,
    deleteLead
} = require('../controllers/leadController');

const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router
    .route('/')
    .get(getLeads)
    .post(createLead);

router
    .route('/:id')
    .get(getLead)
    .put(updateLead)
    .delete(authorize('super-admin', 'owner', 'manager'), deleteLead);

module.exports = router;
