import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../contexts/AuthContext';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Input } from '@material-tailwind/react';
import { toast } from 'react-toastify';

function AddSponsor() {
    const { auth } = useContext(AuthContext); 
    const [cookies] = useCookies(["jwt"]); 
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      nameSponsor: '',
      contactPerson: '',
      email: '',
      phone: '',
      logo: null, // For file inputs, initialize as null
      website: '',
    });
  
    useEffect(() => {
      if (!auth.accessToken || !cookies.jwt) {
        console.error('Access token or cookie is missing', auth.accessToken);
        navigate('/login', { replace: true });   
      }
    }, [auth.accessToken, cookies.jwt]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        logo: file,
      }));
    };
  
    const handleStep1Submit = async (e) => {
      e.preventDefault();
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('nameSponsor', formData.nameSponsor);
        formDataToSend.append('contactPerson', formData.contactPerson);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('logo', formData.logo);
        formDataToSend.append('website', formData.website);
  
        const response = await axios.post(
          "http://localhost:5001/sponsor/add",
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
              'Content-Type': 'multipart/form-data', 
            },
          }
        );
        
        console.log("API response:", response.data);
        toast.success("Sponsor addded Successfully");
  
        // Handle success response here
      } catch (error) {
        console.error("Error:", error);
      }
    };

  return (
    <div className="w-full py-4 px-8">
      <form onSubmit={handleStep1Submit} encType="multipart/form-data" >
        <div>
          <label htmlFor="nameSponsor" className="block mb-1">
          nameSponsor
          </label>
          <Input
            type="text"
            id="nameSponsor"
            name="nameSponsor"
            value={formData.nameSponsor}
            onChange={handleChange}
            placeholder="Enter nameSponsor"
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="contactPerson" className="block mb-1">
          contactPerson
          </label>
          <Input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder="Enter contactPerson"
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="email" className="block mb-1">
          email
          </label>
          <Input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>
        <br />

        <div>
          <label htmlFor="phone" className="block mb-1">
          phone
          </label>
          <Input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone"
            required
          />
        </div>
        <br />

        <div>
          <label htmlFor="logo" className="block mb-1">
          logo
          </label>
          <Input
          type="file"
          id="logo"
          name="logo"
          onChange={handleFileChange}
          required
        />
        </div>
        <br />

        <div>
          <label htmlFor="website" className="block mb-1">
          website
          </label>
          <Input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Enter website"
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


export default AddSponsor