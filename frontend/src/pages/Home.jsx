import Button from '@mui/material/Button'
import React, { useContext, useEffect } from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useState } from 'react';

import ReactModal from 'react-modal';
import { TaskModal } from '../components/TaskModal';
import { TaskCard } from '../components/TaskCard';
import { TaskContext } from '../context/TaskContext';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Pagination from '@mui/material/Pagination';

export const Home = () => {

    const [isAddTaskModal, setIsAddTaskModal] = useState(false)
    const { filter, setFilter, filteredTasks } = useContext(TaskContext);
    const [paginationNumber, setPaginationNumber] = useState(1);
    const [paginatedData, setPaginatedData] = useState([]);


    const getPaginationData = (value) => {

        let totalSongs = filteredTasks.length;

        let start = (value - 1) * 3;

        let end = start + 3;

        if (end > totalSongs) {
            end = totalSongs;
        }

        let task3 = filteredTasks.slice(start, end);

        setPaginatedData(task3);
    }

    useEffect(() => {
        const x = () => {
            getPaginationData(paginationNumber)
        }
        x();
    }, [filteredTasks]);

    const openModal = () => {
        setIsAddTaskModal(true)
    }

    const closeModal = () => {
        setIsAddTaskModal(false)
    }

    const handlePaginationChange = (event, value) => {
        setPaginationNumber(value);
        getPaginationData(value);
    }




    return (
        <div className='bg-[#f7f9fa] h-screen w-full'>

            <div className='shadow-sm flex justify-between px-5 py-4 items-center bg-[#ececf0] m-4 rounded-xl'>
                <div className="">
                    <h2 className='text-[#1976d2] text-xl font-medium capitalize'>{filter} Tasks</h2>
                    <h3 className='text-gray-600 text-base font-base'>{filteredTasks.length} tasks found</h3>
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
                {console.log(filteredTasks)}
                {paginatedData.map((ele) => {
                    return (<TaskCard
                        id={ele._id}
                        title={ele.title}
                        description={ele.description}
                        status={ele.status}

                    />)
                })}
            </div>

            <div className="flex justify-center mt-4 fixed left-[50%] bottom-20 transform-[translate(-50%,-50%)] ">
                {filteredTasks.length > 0 && (
                    <Pagination className=""
                        count={Math.ceil(filteredTasks.length / 3)}
                        page={paginationNumber}
                        onChange={handlePaginationChange}
                        size="small"

                        sx={{
                            "& .MuiPaginationItem-root": {
                                color: "green",
                            },
                            "& .MuiPaginationItem-root.Mui-selected": {
                                backgroundColor: "#34C94B",
                                color: "white",
                            },
                            "& .MuiPaginationItem-root:hover": {
                                backgroundColor: "rgba(0, 128, 0, 0.2)",
                            },
                        }}

                    />


                )}

            </div>










        </div >
    )
}
