import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Login = () => {

    const [username, setUsername] = useState("admin")
    const [password, setPassword] = useState("admin@123")
    const navigate = useNavigate()

    const validation = () => {
        if (username === "admin" && password == "admin@123") return true;
        else return false;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (validation()) {
            navigate('/home')
        } else {
            alert("please enter valid login details... \n username : admin \n password: admin@123")
        }
    };

    return (
        <div className='bg-[#f5f5f5] h-screen flex justify-center items-center px-4'>
            <form onSubmit={handleLogin} className='shadow-xl rounded-2xl h-[400px] w-[400px] p-2 flex flex-col gap-5 justify-evenly'>
                <h2 className='text-xl font-medium' style={{ textAlign: "center" }}>Demo Login</h2>
                <div className='flex flex-col gap-3'>
                    <input
                        type="text"
                        placeholder="enter username (admin)"
                        className='p-3 w-[90%] bg-[#f5f5f5] rounded input bg-white text-medium font-base self-center'
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter password (admin123)"
                        className='p-3 w-[90%] rounded input bg-white text-medium font-base self-center'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        required
                    />
                </div>

                <button type="submit" className='bg-[#000] text-white text-xl py-2 w-1/2 rounded-lg self-center font-bold cursor-pointer'>
                    Login
                </button>
            </form>
        </div>
    )
}
