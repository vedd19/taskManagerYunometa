import React, { useContext, useEffect } from 'react'
import Modal from 'react-modal'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { TaskContext } from '../context/TaskContext';
import { enqueueSnackbar } from 'notistack';

Modal.setAppElement("#root")

export const TaskModal = ({ isOpen, closeModal, isEdit, id }) => {

    const { handleTaskUpdate } = useContext(TaskContext);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            bottom: 'auto',
            marginRight: '-20%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '1rem',
        },
    };

    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        status: ""
    });

    const [loading, setLoading] = useState(false);

    const validateInput = () => {
        return taskData.title !== "" &&
            taskData.description !== "" &&
            taskData.status !== "";
    }

    const handleInputChange = (e) => {
        setTaskData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const resetForm = () => {
        setTaskData({
            title: "",
            description: "",
            status: ""
        });
    }

    const createTaskHandler = async (e) => {
        e.preventDefault();
        if (!validateInput()) {
            alert("All fields are required");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                title: taskData.title,
                description: taskData.description,
                status: taskData.status
            }

            const response = await axios.post(`${config.backendUrl}/api/tasks`, payload);

            if (response.status === 201) {
                resetForm();
                closeModal();
                enqueueSnackbar('task added successfully')
                handleTaskUpdate();
            } else {
                alert("Something went wrong");
            }
        }
        catch (err) {
            console.log("Error creating task:", err);
            alert("Failed to create task");
        } finally {
            setLoading(false);
        }
    }

    const updateTaskHandler = async (e) => {
        e.preventDefault();
        if (!validateInput()) {
            alert("All fields are required");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                title: taskData.title,
                description: taskData.description,
                status: taskData.status
            }

            const response = await axios.put(`${config.backendUrl}/api/tasks/${id}`, payload);

            if (response.status === 200) {
                closeModal();
                enqueueSnackbar('task updated successfully')
                handleTaskUpdate();
            } else {
                alert("Something went wrong");
            }
        }
        catch (err) {
            console.log("Error updating task:", err);
            alert("Failed to update task");
        } finally {
            setLoading(false);
        }
    }

    const getTaskData = async () => {
        if (!id) return;

        setLoading(true);
        try {
            const response = await axios.get(`${config.backendUrl}/api/tasks/${id}`);
            const data = response.data;
            setTaskData({
                title: data.title || "",
                description: data.description || "",
                status: data.status || ""
            });
        } catch (err) {
            console.log("Error fetching task:", err);
            alert("Failed to load task data");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isOpen) {
            if (isEdit && id) {
                getTaskData();
            } else {
                resetForm();
            }
        }
    }, [isOpen, isEdit, id]);

    const handleSubmit = (e) => {
        if (isEdit) {
            updateTaskHandler(e);
        } else {
            createTaskHandler(e);
        }
    }

    const handleClose = () => {
        resetForm();
        closeModal();
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={handleClose}
                style={customStyles}
            >
                <div className="mb-4">
                    <h1 className='font-semibold text-2xl'>
                        {isEdit ? 'Edit Task' : 'Create New Task'}
                    </h1>
                    <p className='text-base font-base text-gray-600'>
                        {isEdit ? 'Update the task details' : 'Fill in the details to create a new task'}
                    </p>

                    <ClearOutlinedIcon
                        className='cursor-pointer text-gray-400 absolute top-4 right-4'
                        onClick={handleClose}
                    />
                </div>

                <div className="">
                    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                        <div>
                            <label htmlFor="title" className='font-medium'>Title*</label> <br />
                            <input
                                value={taskData.title}
                                onChange={handleInputChange}
                                type="text"
                                id='title'
                                placeholder='Enter Task Title'
                                className='mt-2 bg-gray-100 rounded px-3 py-2 w-full'
                                name='title'
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor="desc" className='font-medium'>Description*</label>
                            <textarea
                                value={taskData.description}
                                onChange={handleInputChange}
                                id='desc'
                                placeholder='Enter Description'
                                className='mt-2 bg-gray-100 rounded px-3 py-2 w-full'
                                name='description'
                                required
                                disabled={loading}
                                rows={4}
                            />
                        </div>
                        <div>
                            <label htmlFor="statusAddTaskModal" className='font-medium'>Status*</label><br />
                            <select
                                value={taskData.status}
                                onChange={handleInputChange}
                                className='mt-2 w-full py-2 bg-gray-100 rounded px-1'
                                name='status'
                                id='statusAddTaskModal'
                                disabled={loading}
                            >
                                <option value="">Select Status</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-3 mt-5">
                            <Button
                                onClick={handleClose}
                                variant='outlined'
                                disabled={loading}
                                sx={{ color: 'black', borderColor: "gray", fontWeight: "bold" }}
                            >
                                Cancel
                            </Button>

                            <Button
                                type='submit'
                                variant='contained'
                                disabled={loading}
                                sx={{
                                    color: 'white',
                                    borderColor: "gray",
                                    fontWeight: "bold",
                                    backgroundColor: "black",

                                }}
                            >
                                {loading ? 'Loading...' : (isEdit ? 'Save Changes' : 'Create Task')}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}