import Button from '@mui/material/Button';
import React, { useContext } from 'react'
import Modal from 'react-modal'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import axios from 'axios';
import config from '../config';
import { TaskContext } from '../context/TaskContext';
import { enqueueSnackbar } from 'notistack'

export const ConfirmDeleteModal = ({ closeDeleteModal, id }) => {

    const { handleTaskUpdate } = useContext(TaskContext);

    const deleteTaskHandler = async () => {
        try {
            const response = await axios.delete(`${config.backendUrl}/api/tasks/${id}`);
            if (response.status === 200) {
                closeDeleteModal();
                enqueueSnackbar("task deleted successfully")
                handleTaskUpdate();
            }
        } catch (err) {
            console.error("error while deleting task", err)
        }
    }

    return (
        <div>

            <div className='bg-white w-100 shadow-xl rounded-md px-5 absolute left-[50%] top-[50%] py-4' style={{ zIndex: 999, transform: "translate(-50%,-50%)" }}>
                <ClearOutlinedIcon
                    className='cursor-pointer text-gray-400 absolute top-4 right-4'
                    onClick={closeDeleteModal}
                />
                <p>Are you sure you want to delete the Task?</p>
                <div className="w-full flex justify-end gap-3 mt-4">
                    <Button
                        onClick={closeDeleteModal}
                        size='small' variant='outlined' color='black' sx={{ fontWeight: "bold", borderColor: "gray" }}>Cancel</Button>
                    <Button onClick={deleteTaskHandler} size='small' variant='contained' color='red' sx={{ backgroundColor: "red", fontWeight: "bold", borderColor: "red", color: "white" }}>Confirm</Button>
                </div>
            </div>


        </div>
    )
}
