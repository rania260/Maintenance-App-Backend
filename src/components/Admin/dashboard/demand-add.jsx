import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Card, CardBody, CardHeader, Chip, IconButton, Typography } from '@material-tailwind/react';
import { HiPencilAlt, HiPlus, HiTrash } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const DemandAdd = () => {

    const [demandTableData, setDemandTableData] = useState([]);
    const { auth } = useContext(AuthContext);
    const [cookies] = useCookies(["jwt"]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:5001/demand/suivi", {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          });
  
          setDemandTableData(response.data);
          console.log("response data ", response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [auth.accessToken, cookies.jwt]);
  
   
    return  <div className="flex-grow p-4">
    <Card>
      <CardHeader
        variant="gradient"
        style={{
          background: "#0275d8",
          padding: "12px 12px",
          margin: "8px 0",
          height:"3rem"
        }}
        className="mb-8 p-6"
      >
        <div className="flex justify-between items-center">
          <Typography variant="h6" color="white">
            Demand Add To Maintenance Agency Table
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {[
                "Organisation Name",
                "Phone Number",
                "Address",
                "State",
                "Client",
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
            {demandTableData &&
              demandTableData.map(
                ({ _id,    
                    organisation,
                    state,
                    client
                }) => (
                  <tr key={_id}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {organisation.organisationName}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {organisation.phoneNumber}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {organisation.address}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Chip
                        variant="ghost"
                        color={state === "IN PROGRESS" ? "amber" : "red"}
                        value={state === "IN PROGRESS" ? "IN PROGRESS" : "ACCEPTED"}
                        className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        
                      />
              
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {client.email}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50 flex gap-4">
                      <Link
                        to={`/edit-demand/${_id}`}
                        className="text-xs font-semibold text-blue-gray-600"
                      >
                        <IconButton color="indigo">
                        <HiPencilAlt />

                        </IconButton>
                      </Link>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  </div>

}

export default DemandAdd
