import React, { useEffect, useState } from 'react'
import { TaskContext } from './TaskContext'
import axios from 'axios';
import config from '../config';

export const TaskContextProvider = ({ children }) => {
    const [allTasks, setAllTasks] = useState([]);

    const handleTaskUpdate = () => {
        getTasks();
    }

    async function getTasks() {
        try {
            const response = await axios.get(`${config.backendUrl}/api/tasks`);
            const data = response.data.allTasks;
            setAllTasks(data)
            // console.log(data.allTasks);
        } catch (err) {
            console.log("error", err)
        }
    }

    useEffect(() => {
        getTasks();
    }, [])

    return (
        <TaskContext.Provider value={{ allTasks, setAllTasks, handleTaskUpdate }}>
            {children}
        </TaskContext.Provider>
    )
}
