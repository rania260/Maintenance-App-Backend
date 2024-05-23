import React, { useContext, useEffect, useState } from "react";
import {  Button, Input } from "@material-tailwind/react";
import axios from "axios";

import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function SendDemand() {
  const { auth } = useContext(AuthContext); 
  const [cookies] = useCookies(["jwt"]); 
  const navigate = useNavigate();


  useEffect(() => {
      if (!auth.accessToken || !cookies.jwt) {
          console.error('Access token or cookie is missing',auth.accessToken);
          navigate('/login', { replace: true });   

        }
        
    }, [auth.accessToken, cookies.jwt]);
    
  


  const [formData, setFormData] = useState({
    organisationName: "",
    phoneNumber: "",
    address: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
            "http://localhost:5001/demand/send",
            {
              organisation: {
                organisationName: formData.organisationName,
                phoneNumber: formData.phoneNumber,
                address: formData.address,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${auth.accessToken}`,
              },
            }
          );
          
      console.log("API response:", response.data);
      toast.success("Demand Sended Successfully");

      // Handle success response here
    } catch (error) {
      console.error("Error:", error);
      // Handle error here
    }
  };

  return (
    <div className="w-full py-4 px-8">
      <form onSubmit={handleStep1Submit}>
        <div>
          <label htmlFor="organisationName" className="block mb-1">
            Organization Name
          </label>
          <Input
            type="text"
            id="organisationName"
            name="organisationName"
            value={formData.organisationName}
            onChange={handleChange}
            placeholder="Enter organization name"
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="phoneNumber" className="block mb-1">
            Phone Number
          </label>
          <Input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="address" className="block mb-1">
            Address
          </label>
          <Input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            required
          />
        </div>
        <br />
        <Button type="submit" color="blue">
          Send
        </Button>
      </form>
    </div>
  );
}

export default SendDemand;
