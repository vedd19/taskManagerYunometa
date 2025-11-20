import React from "react";
import { Link } from "react-router-dom";
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';

export function Navbar() {

    return (
        <div className="flex gap-3 px-3 py-4 items-center border-b-1 border-b-gray-300">
            <div>
                <AddTaskOutlinedIcon sx={{ color: "#155dfc" }} />

            </div>
            <div>
                <span className="text-[#155dfc] text-xl">Task Manager</span>
                <p className="text-[#4a5592] text-sm">Manage your task efficiently</p>
            </div>

        </div>
    );
}
