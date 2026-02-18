const express = require('express');
const {
    getDeals,
    createDeal,
    updateDeal
} = require('../controllers/dealController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router
    .route('/')
    .get(getDeals)
    .post(createDeal);

router
    .route('/:id')
    .put(updateDeal);

module.exports = router;
