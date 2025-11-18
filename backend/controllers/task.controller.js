const { validationResult } = require('express-validator');
const taskModel = require('../models/task.model');

module.exports.addTask = async (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    const { title, description, status } = req.body;

    try {
        await taskModel.create({
            title,
            description,
            status
        });
        res.status(201).json({ message: "Task added" })
    } catch (err) {
        console.log(err)
    }
}