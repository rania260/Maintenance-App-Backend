import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import { Chip } from "@material-tailwind/react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { HiPencilAlt, HiPlus, HiTrash } from "react-icons/hi";
import { toast } from "react-toastify";
export function Tables() {
  const [usersTableData, setUsersTableData] = useState([]);
  const { auth } = useContext(AuthContext);
  const [cookies] = useCookies(["jwt"]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/users/", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });

        setUsersTableData(response.data);
        //console.log("response data ", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [auth.accessToken, cookies.jwt]);

  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/users/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      toast.warning("User Deleted Successfully");

      setUsersTableData(prevData => prevData.filter(user => user._id !== id));

      // Handle the response
      console.log('Delete API called successfully', response);
    } catch (error) {
      // Handle errors
      console.error('Error calling delete API:', error);
    }
  };
  
  return (
    <div className="flex-grow p-4">
      <Card>
        <CardHeader
          variant="gradient"
          style={{
            background: "#0275d8",
            padding: "4px 12px",
            margin: "8px 0",
          }}
          className="mb-8 p-6"
        >
          <div className="flex justify-between items-center">
            <Typography variant="h6" color="white">
              Users Table
            </Typography>
            <Link to="/adduser">
              <IconButton color="black" >
                <HiPlus/> 
              </IconButton>
            </Link>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "Email",
                  "Firstname",
                  "Lastname",
                  "IsActive",
                  "Role",
                  "Action",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {usersTableData &&
                usersTableData.map(
                  ({ _id, firstname, lastname, email, role, isActive }) => (
                    <tr key={_id}>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {firstname}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {lastname}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Chip
                          variant="ghost"
                          color={isActive === "ACTIVE" ? "green" : "red"}
                          value={isActive === "ACTIVE" ? "ACTIVE" : "INACTIVE"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          
                        />
                
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {role}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50 flex gap-4">
                        <Link
                          to={`/edit/${_id}`}
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          <IconButton color="indigo">
                          <HiPencilAlt />

                          </IconButton>
                        </Link>
                        <IconButton color="blue-gray" onClick={() => handleDeleteClick(_id)}>
                          <HiTrash/>
                        </IconButton>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};
export default Tables;
