import Button from '@mui/material/Button'
import React, { useContext } from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useState } from 'react';

import ReactModal from 'react-modal';
import { TaskModal } from '../components/TaskModal';
import { TaskCard } from '../components/TaskCard';
import { TaskContext } from '../context/TaskContext';

export const Home = () => {
    const [filter, setFilter] = useState("All")
    const [isAddTaskModal, setIsAddTaskModal] = useState(false)
    const { allTasks } = useContext(TaskContext);


    const openModal = () => {
        setIsAddTaskModal(true)
    }

    const closeModal = () => {
        setIsAddTaskModal(false)
    }


    return (
        <div className='bg-[#f7f9fa] h-screen w-full'>

            <div className='shadow-sm flex justify-between px-5 py-4 items-center bg-[#ececf0] m-4 rounded-xl'>
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
                        isEdit={false}


                    />}
                </div>
            </div>
            {/* {console.log(allTasks)} */}
            <div className="tasks-div flex flex-col gap-5 justify-center items-center">
                {allTasks.map((ele) => {
                    return (<TaskCard
                        id={ele._id}
                        title={ele.title}
                        description={ele.description}
                        status={ele.status}

                    />)
                })}
            </div>





        </div >
    )
}
