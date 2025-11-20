import React, { useState } from 'react'
import Button from '@mui/material/Button'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { TaskModal } from './TaskModal';
import { TaskContext } from '../context/TaskContext';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

export const TaskCard = ({ title, description, status, id }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isDelete, setIsDelete] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }
    function closeDeleteModal() {
        setIsDelete(false)
    }

    const editHandler = () => {
        setIsOpen(true)
    }

    const deleteHandler = () => {
        setIsDelete(true)
    }

    return (

        <div className="shadow-md border-1 border-gray-200 mx-4 p-2 flex justify-between h-30 rounded-lg container">

            <div className="flex justify-start w-100">
                <div className=''>
                    <div className="title font-medium">
                        Title : {title}
                    </div>

                    <div className="description font-light text-gray-600">{description}</div>
                </div>
            </div>

            <div className="h-full icons flex flex-col justify-between self-end">

                <div className="self-end">
                    {<span className={`${status === "pending" ? "bg-[#fef9c2] text-[#894b00]" : ""} ${status === "completed" ? "bg-[#dbfce7] text-[#016f7d]" : ""}  rounded-xl px-3   font-medium`} style={{ textAlign: "center" }}>{status}</span>}
                </div>

                <div className="">
                    <Button
                        onClick={editHandler}
                        variant='outlined'
                        className=""
                        startIcon={<EditOutlinedIcon sx={{ color: "black" }} />}
                        sx={{ color: "black", borderColor: "gray", fontWeight: "bold", marginX: "3px" }}
                        size='small'
                    >
                        Edit
                    </Button>
                    {isOpen && <TaskModal isOpen={isOpen}
                        closeModal={closeModal} isEdit={true}
                        id={id}
                    />}
                    <Button
                        onClick={deleteHandler}
                        variant='outlined'
                        className="font-bold"
                        startIcon={<DeleteOutlineOutlinedIcon sx={{ color: "red" }} />}
                        sx={{ color: "red", borderColor: "gray", fontWeight: "bold" }}
                        size='small'

                    >
                        Delete
                    </Button>
                    {isDelete && <ConfirmDeleteModal
                        closeDeleteModal={closeDeleteModal}
                        isDelete={isDelete}
                        id={id}
                    />}
                </div>
            </div>


        </div>
    )
}
