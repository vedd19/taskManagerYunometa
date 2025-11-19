import Button from '@mui/material/Button'
import React from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ReactModal from 'react-modal';
import { TaskModal } from '../components/TaskModal';

export const Home = () => {
    const [filter, setFilter] = useState("All")
    const [isAddTaskModal, setIsAddTaskModal] = useState(false)

    const openModal = () => {
        setIsAddTaskModal(true)
    }

    const closeModal = () => {
        setIsAddTaskModal(false)
    }
    return (
        <div className='bg-[#f7f9fa] h-screen w-full'>

            <div className='flex justify-between px-5 py-4 items-center bg-[#ececf0] m-4 rounded-xl'>
                <div className="">
                    <h2 className='text-[#1976d2] text-xl font-medium capitalize'>{filter} Tasks</h2>
                    <h3 className='text-gray-600 text-base font-base'>3 tasks found</h3>
                </div>

                <div className="flex items-center gap-2">
                    <p className='capitalize text-base font-base'>filter by</p>

                    <select className='shadow-sm px-1 text-sm font-medium text-gray-200 py-1.5 rounded bg-[#1976d2]' name="filterTask" id="filterTask" onChange={(e) => { setFilter(e.target.value) }}>
                        <option className='rounded-xl font-medium bg-white text-black' selected value="all">All</option>
                        <option className='rounded-xl font-medium bg-white text-black' value="pending">Pending</option>
                        <option className='rounded-xl font-medium bg-white text-black' value="completed">Completed</option>
                    </select>

                </div>

                <div className="create-task rounded">
                    <Button
                        onClick={openModal}
                        size='small'
                        variant='contained'
                        color='primary'
                        startIcon={<AddOutlinedIcon />
                        }>
                        Create Task
                    </Button>
                    {isAddTaskModal && <TaskModal isOpen={isAddTaskModal}
                        closeModal={closeModal}
                    />}
                </div>
            </div>

            <div className="tasks-div">
                <div className="border-1 border-gray-200 mx-4 p-2 flex justify-between h-20 rounded-lg">
                    <div className='flex gap-3'>
                        <div className="title">
                            title
                        </div>

                        <div className="description">description</div>
                    </div>

                    <div className="h-full icons flex flex-col justify-between self-end">

                        <div className="self-end">
                            <span className="bg-[#dbfce7] rounded-xl px-3  text-[#016f7d] font-medium " style={{ textAlign: "center" }}>completed</span>
                        </div>

                        <div className="">
                            <Button
                                variant='outlined'
                                className=""
                                startIcon={<EditOutlinedIcon sx={{ color: "black" }} />}
                                sx={{ color: "black", borderColor: "gray", fontWeight: "bold", marginX: "3px" }}
                                size='small'
                            >
                                Edit
                            </Button>
                            <Button
                                variant='outlined'
                                className="font-bold"
                                startIcon={<DeleteOutlineOutlinedIcon sx={{ color: "red" }} />}
                                sx={{ color: "red", borderColor: "gray", fontWeight: "bold" }}
                                size='small'
                            >
                                Delete
                            </Button>
                        </div>
                    </div>


                </div>
            </div>

        </div >
    )
}
