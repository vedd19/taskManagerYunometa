const mongoose = require('mongoose')
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

module.exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await taskModel.find({});
        // console.log("tasks", tasks);
        res.status(200).json({ allTasks: tasks })
    }
    catch (err) {
        res.status(400).json({ error: err })
    }
}

module.exports.getSingleTask = async (req, res, next) => {

    const taskId = req.params.id;
    // console.log(taskId)

    try {
        const task = await taskModel.findById({ _id: taskId });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}


module.exports.updateTask = async (req, res, next) => {
    const id = req.params.id;
    const { title, description, status } = req.body;

    try {
        const updatedTask = await taskModel.findByIdAndUpdate(
            id,
            {
                title,
                description,
                status
            },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "updated succesfully", updatedTask });
    } catch (err) {
        res.status(500).json({ message: "Server error", err });
    }
}

module.exports.deleteTask = async (req, res, next) => {
    const id = req.params.id;

    try {
        const deletedTask = await taskModel.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "task deleted succesfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", err });
    }
}



