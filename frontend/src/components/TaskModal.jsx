import React from 'react'
import Modal from 'react-modal'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export const TaskModal = ({ isOpen, closeModal }) => {

    Modal.setAppElement("#root")
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            // right: 'auto',
            bottom: 'auto',
            marginRight: '-20%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '1rem',
        },
    };

    const [addTaskData, setAddTaskData] = useState({
        title: "",
        description: "",
        status: ""
    });

    const validateInput = () => {
        if (addTaskData.title === "" || addTaskData.description === "" || addTaskData.status === "") {

            return false;
        } else {
            return true;
        }
    }

    const handleInputChange = (e) => {
        setAddTaskData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const createTaskHandler = async (e) => {
        e.preventDefault();
        if (validateInput()) {
            // console.log(addTaskData)
            const payload = {
                title: addTaskData.title,
                description: addTaskData.description,
                status: addTaskData.status
            }
            try {
                const response = await axios.post(`${config.backendUrl}/api/tasks`, payload);

                if (response.status === 201) {
                    closeModal()
                    alert("task added successfully")

                } else {
                    alert("something went wrong")
                }
            }
            catch (err) {
                console.log(err)
            }
        } else {
            alert("all fields are required");
        }
    }


    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}

            >




                <div className="mb-4">
                    <h1 className='font-semibold text-2xl'>Create New Task</h1>
                    <p className='text-base font-base text-gray-600'>Fill in the details to create a new task</p>

                    <ClearOutlinedIcon className='cursor-pointer text-gray-400 absolute top-4 right-4' onClick={closeModal} />
                </div>

                <div className="">
                    <form onSubmit={createTaskHandler} className='flex flex-col gap-5'>

                        <div>
                            <label htmlFor="title" className='font-medium'>Title*</label> <br />
                            <input
                                onChange={handleInputChange}
                                type="text" id='title' placeholder='Enter Task Title' className='mt-2 bg-gray-100 rounded px-3 py-2 w-full'
                                name='title'
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="desc" className='font-medium'>Description*</label>
                            <textarea
                                onChange={handleInputChange}
                                type="text" id='desc' placeholder='Enter Description' className='mt-2 bg-gray-100 rounded px-3 py-2 w-full'
                                name='description'
                                required

                            />
                        </div>
                        <div>
                            <label htmlFor="statusAddTaskModal" className='font-medium'>Status*</label><br />
                            <select
                                onChange={handleInputChange}
                                className='mt-2 w-full py-2 bg-gray-100 rounded px-1'
                                name='status'
                                id='statusAddTaskModal'>
                                <option
                                    className='bg-gray-100'
                                    value=""
                                >
                                    Select Status
                                </option>
                                <option
                                    className='bg-gray-100'
                                    value="pending"
                                >
                                    Pending
                                </option>
                                <option
                                    className='bg-gray-100'
                                    value="completed"
                                >
                                    Completed
                                </option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-3 mt-5">
                            <Button
                                onClick={closeModal}
                                variant='outlined'
                                sx={{ color: 'black', borderColor: "gray", fontWeight: "bold" }}
                            >
                                Cancel
                            </Button>

                            <Button
                                type='submit'
                                variant='contained'
                                sx={{ color: 'white', borderColor: "gray", fontWeight: "bold", backgroundColor: "black" }}
                            >
                                Create Task
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}
