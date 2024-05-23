import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import {
  Button,
  Checkbox,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";

const EditUser = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const { id } = useParams();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/users/get-user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        setUser(response.data);
     //   console.log("user data", response.data);
         // Set the initial values of the form fields
         setFirstname(response.data.firstname);
         setLastname(response.data.lastname);
         setEmail(response.data.email);
         setRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a user object with the updated form data
    const updatedUser = {
      firstname,
      lastname,
      email,
      password,
      role,
    };
    console.log("update user",updatedUser)
    // Send a PUT request to update the user data
    try {
      const response = await axios.put(
        `http://localhost:5001/users/update-user/${id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      console.log("User updated successfully:", response.data);
      toast.success("User Updated Successfully");
      navigate("/dashboard")
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
        <div className="mb-1 flex flex-col gap-6 w-[32rem]">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Firstname
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Lastname
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Role
          </Typography>
          <Select label="Select Role" value={role} onChange={(value) => setRole(value)}>
            <Option value="ADMIN">Admin</Option>
            <Option value="CLIENT">Client</Option>
            <Option value="TECHNICIEN">Technician</Option>
          </Select>

       
        </div>
        <Button className="mt-6 w-[32rem] bg-blue" fullWidth type="submit">
        Save Changes

        </Button>
      
      </form>
    </div>
  );
};

export default EditUser;
