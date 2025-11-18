const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const taskController = require('../controllers/task.controller');


router.post('/api/tasks', [
    body('title').notEmpty().withMessage("Title can not be empty"),
    body('description').notEmpty().withMessage("Description can not be empty"),
    body('status').isIn(['pending', 'in progress', 'completed']).withMessage("Status must be pending, in progress, or completed")
], taskController.addTask);

module.exports = router;