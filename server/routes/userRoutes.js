const express = require('express');
const { getUsers, createUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // All routes are protected

router.route('/')
    .get(getUsers)
    .post(createUser);

module.exports = router;
