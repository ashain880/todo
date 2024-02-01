const express = require('express');
const mongoose = require('mongoose');
const app = express.Router();

const SCHEMA = "task";

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
});

const TaskModel = mongoose.model(SCHEMA, taskSchema);

// Get all tasks
app.get('/tasks', async (req, res) => {
    const tasks = await TaskModel.find();
    res.status(200).json({ status:200, message: `Tasks fetched successfully`, data:tasks});
});

// Get task by id
app.get('/task/:id', async (req, res) => {
    const { id } = req.params;
    const tasks = await TaskModel.findById(id);
    res.status(200).json({ status:200, message: `Tasks fetched successfully`, data:tasks});
});

// Add a new task
app.post('/tasks', async (req, res) => {
    const { title, description} = req.body;
    if (!title && !description) {
        return res.status(400).json({ status:400, error: `Title & description is required` });
    }
    const newTask = new TaskModel({
        title,
        description,
        completed: false,
    });
    await newTask.save();
    res.status(201).json({ status:201, message: `Task created successfully`, data:newTask});
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const updatedTask = await TaskModel.findByIdAndUpdate(
        id,
        { title, description, completed },
        { new: true }
    );
    res.status(201).json({ status:201, message: `Task ${id} updated successfully`, data:updatedTask});
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    await TaskModel.findByIdAndDelete(id);
    res.status(201).json({ status:201, message: `Task ${id} deleted successfully` });
});

module.exports = app;