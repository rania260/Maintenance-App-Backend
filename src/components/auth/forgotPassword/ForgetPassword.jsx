import { useState } from "react";
import Navbar from "../../Navbar/navbar"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate= useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Forget password request submitted for email:", email);
    axios.post("http://localhost:5001/auth/forgot",{email})
    .then(res =>{
      console.log(res.data)
      toast.info("Check your email");
        }).catch(err => console.log(err))
  };

  return (
    <>
    <Navbar/>

    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Forget Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default ForgetPassword;