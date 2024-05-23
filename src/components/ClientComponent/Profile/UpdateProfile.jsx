import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

function UpdateProfile() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cookies] = useCookies(["jwt"]); // get cookies

  // Function to fetch user data from the backend
  const fetchUserData = async () => {
    try {
        
      const response = await axios.get("http://localhost:5001/users/getuser", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      const userData = response.data;
      setFormData(userData); // Set the form data with the fetched user data
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [auth.accessToken, cookies.jwt]);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send update request to backend
      const response = await axios.put("http://localhost:5000/users/update", formData, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      //navigate to route profile
      navigate('/accueil');
      // Handle successful update
    } catch (error) {
      // Handle error
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div class="flex justify-center mt-20 px-8">
        <form class="max-w-2xl" onSubmit={handleSubmit}>
          <div class="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
            <h2 class="text-xl text-gray-600 dark:text-gray-300 pb-2">
              Account settings:
            </h2>

            <div class="flex flex-col gap-2 w-full border-gray-400">
              <div>
                <label class="text-gray-600 dark:text-gray-400">
                  First Name
                </label>
                <input
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                  type="text"
                  name="firstname"
                  defaultValue={formData.firstname}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label class="text-gray-600 dark:text-gray-400">
                  Last Name
                </label>
                <input
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                  type="text"
                  name="lastname"
                  defaultValue={formData.lastname}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label class="text-gray-600 dark:text-gray-400">Email</label>
                <input
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div class="flex justify-end">
                <div class="p-6 border-t border-gray-200 rounded-b">
                  <button
                    class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"
                  >
                    Save all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
