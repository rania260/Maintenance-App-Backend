import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ListDemand() {
  const [demandTableData, setDemandTableData] = useState([]);
  const { auth } = useContext(AuthContext);
  const [cookies] = useCookies(["jwt"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.accessToken || !cookies.jwt) {
      if (!auth.accessToken) {
        console.error('Access token is missing');
      }
      if (!cookies.jwt) {
        console.error('JWT cookie is missing');
      }
      navigate('/login', { replace: true });
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/demand/get-demand-client",
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );

        setDemandTableData(response.data);
        console.log("response data ", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
}, [auth.accessToken, cookies.jwt, navigate]);

  return (
    <div className="flex-grow p-4">
      <Card>
        <CardHeader
          variant="gradient"
          style={{
            background: "#0275d8",
            padding: "12px 12px",
            margin: "8px 0",
            height: "3rem",
          }}
          className="mb-8 p-6"
        >
          <div className="flex justify-between items-center">
            <Typography variant="h6" color="white">
              List of Demands
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
                demandTableData.map(({ _id, organisation, state, client }) => (
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
                        color={
                          state === "IN PROGRESS"
                            ? "amber"
                            : state === "ACCEPTED"
                            ? "green"
                            : state === "REFUSED"
                            ? "red"
                            : "default" 
                        }
                        value={
                          state === "IN PROGRESS"
                            ? "IN PROGRESS"
                            : state === "ACCEPTED"
                            ? "ACCEPTED"
                            : state === "REFUSED"
                            ? "REFUSED"
                            : "UNKNOWN" 
                        }
                        className="py-0.5 px-2 text-[11px] font-medium w-fit"
                      />
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {client.email}
                      </Typography>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default ListDemand;
