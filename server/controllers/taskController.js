const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ company: req.user.company });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res, next) => {
    try {
        req.body.company = req.user.company;

        const task = await Task.create(req.body);

        res.status(201).json({
            success: true,
            data: task,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res, next) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }

        if (task.company.toString() !== req.user.company.toString()) {
            return res.status(403).json({ success: false, error: 'Not authorized' });
        }

        task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: task,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res, next) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }

        if (task.company.toString() !== req.user.company.toString()) {
            return res.status(403).json({ success: false, error: 'Not authorized' });
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        next(err);
    }
};
