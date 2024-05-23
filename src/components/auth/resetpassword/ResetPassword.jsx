import React, { useState } from 'react'
import Navbar from "../../Navbar/navbar"
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const navigate= useNavigate()
    const {id,token} = useParams()
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5001/auth/reset-password/${id}/${token}`,{password})
        .then(res =>{
          console.log(res.data)
          toast.success("Password reset successful"); // Show success toast
             navigate("/login")
        }).catch(err => {
            toast.error("Password reset failed"); // Show error toast
            console.log(err)})
      };
  return (
    <>
    <Navbar/>

    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
             New Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
           Update 
          </button>
        </form>
      </div>
    </div>

    </>  )
}

export default ResetPassword