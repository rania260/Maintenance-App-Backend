import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { HiPencilAlt, HiPlus, HiTrash } from "react-icons/hi";

function ListSponsor() {
  const [sponsorTableData, setSponsorTableData] = useState([]);
  const { auth } = useContext(AuthContext);
  const [cookies] = useCookies(["jwt"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.accessToken && !cookies.jwt) {
      if (!auth.accessToken) {
        console.error("Access token is missing");
      }
      if (!cookies.jwt) {
        console.error("JWT cookie is missing");
      }
      navigate("/login", { replace: true });
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/sponsor/all", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });

        setSponsorTableData(response.data);
        console.log("response data ", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [auth.accessToken, cookies.jwt]);


  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5001/sponsor/delete/${id}`, {
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
              Sponsors Table
            </Typography>
            <Link to="/addsponsor">
              <IconButton color="black">
                <HiPlus />
              </IconButton>
            </Link>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "Name Sponsor",
                  "contactPerson",
                  "email",
                  "phone",
                  "logo",
                  "website",
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
              {sponsorTableData &&
                sponsorTableData.map(
                  ({
                    _id,
                    nameSponsor,
                    contactPerson,
                    email,
                    phone,
                    logo,
                    website,
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
                              {nameSponsor}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {contactPerson}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {email}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {phone}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <img src={`http://localhost:5001/${logo}`} alt="Logo" className="w-8 h-8" />
                      </td>

                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {website}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50 flex gap-4">
                        <Link
                          to={`/edit-sponsor/${_id}`}
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
}

export default ListSponsor;
