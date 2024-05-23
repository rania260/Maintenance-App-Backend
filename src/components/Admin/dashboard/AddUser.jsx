import React, { useContext, useState } from "react";
import axios from "axios"; 
import {
  Button,
  Card,
  Checkbox,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleRoleChange = (selectedOption) => {
    console.log("role",selectedOption)
    setSelectedRole(selectedOption);
  };
 
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a user object with the form data
    const newUser = {
      firstname,
      lastname,
      email,
      password,
      role: selectedRole,
    };
    console.log("newUser", newUser);

    try {
      // Send a POST request to the API endpoint with the user data

      const response = await axios.post(
        "http://localhost:5001/users/addnewuser",
        newUser,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

      toast.info("User Added Successfully");


      // Handle success
      console.log("User added successfully:", response.data);
      navigate("/dashboard")
    
    } catch (error) {
      // Handle error
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <Card color="transparent" shadow={false}>
        <Typography color="gray" className="mt-1 font-normal">
          Enter user details :
        </Typography>

        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              First Name
            </Typography>
            <Input
              size="lg"
              placeholder="Foulen"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Last Name
            </Typography>
            <Input
              size="lg"
              placeholder="Ben foulen"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Role
            </Typography>
            <Select
              label="Select Role"
              value={selectedRole}
              onChange={handleRoleChange}  >
              <Option value="ADMIN">Admin</Option>
              <Option value="CLIENT">Client</Option>
              <Option value="TECHNICIEN">Technician</Option>
            </Select>
          </div>

          <Button type="submit" className="mt-6 bg-blue" fullWidth>
            Add
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default AddUser;
