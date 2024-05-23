import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import { useCookies } from "react-cookie";

function Profile() {
  const { auth } = useContext(AuthContext); // Get auth from context
  const [userProfile, setUserProfile] = useState(null);
  const [cookies] = useCookies(["jwt"]); // Add this line to get cookies

  useEffect(() => {
    const getProfile = async () => {
      // Check if auth.accessToken and cookies.jwt are available
      if (!auth.accessToken || !cookies.jwt) {
        console.error("Access token or cookie is missing", auth.accessToken);
        return <Navigate  replace to="/login" />;
      }

      try {
        const response = await axios.get(
          "http://localhost:5001/users/getuser",
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );

        // Assuming your API response contains profile information
        const fetchedUserProfile = response.data;
        //  console.log('Fetched User Profile:', fetchedUserProfile);

        // Set the user profile data in state
        setUserProfile(fetchedUserProfile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Handle errors accordingly
      }
    };

    // Call the getProfile function when the component mounts
    getProfile();
  }, [auth.accessToken, cookies.jwt]);

  return (
    <div className="flex">
      {userProfile ? (
        <>
          <div className="container">
            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  User Profile
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  This is some information about the user.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {userProfile.firstname && userProfile.lastname
                        ? `${userProfile.firstname} ${userProfile.lastname}`
                        : "No Name Found"}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {userProfile.email || "No Email Found"}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Phone number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      (+216) {userProfile.phone || "No Phone Found"}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="px-4 py-5 sm:px-6">
                <Link to="/updateProfile">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Update Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading</p>
)}
    </div>
  );
}

export default Profile;
