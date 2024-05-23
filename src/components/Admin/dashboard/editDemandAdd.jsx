import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";

function EditDemandAdd() {
  const { auth } = useContext(AuthContext);

  const [demand, setDemand] = useState({});
  const [state, setState] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    const fetchDemand = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/demand/get-demand/${id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        setDemand(response.data);
        console.log("get demand by id", response.data);
        setState(response.data.state);
          } catch (error) {
        console.error("Error fetching demand:", error);
      }
    };

    fetchDemand();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedDemand = {
      state,
    };
    // Send a PUT request to update the demand data
    try {
      const response = await axios.put(
        `http://localhost:5001/demand/changestate/${id}`,
        updatedDemand,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      console.log("demand updated successfully:", updatedDemand);
      toast.success("demand Updated Successfully");
      navigate("/demand-add");
    } catch (error) {
      console.error("Error updating user:", error);
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
            <Typography variant="h4" color="white">
              Demand Details
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div>
            <div>
              <Typography variant="h6" color="black">
                Organisation Name:
              </Typography>
              <Typography
                variant="small"
                className="text-[16px] font-bold uppercase text-blue-gray-400"
              >
                {demand?.organisation?.organisationName}
              </Typography>
              <Typography variant="h6" color="black">
                Phone Number: :
              </Typography>
              <Typography
                variant="small"
                className="text-[16px] font-bold uppercase text-blue-gray-400"
              >
                {demand?.organisation?.phoneNumber}
              </Typography>
              <Typography variant="h6" color="black">
                Address:
              </Typography>

              <Typography
                variant="small"
                className="text-[16px] font-bold uppercase text-blue-gray-400"
              >
                {demand?.organisation?.address}{" "}
              </Typography>
              <Typography variant="h6" color="black">
                State:
              </Typography>
              <Typography
                variant="small"
                className="text-[16px] font-bold uppercase text-blue-gray-400"
              >
                {demand?.state}{" "}
              </Typography>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  State
                </Typography>
                <br />

                <Select
                  label="Change State"
                  value={state}
                  onChange={(value) => setState(value)}
                >
                  <Option value="IN PROGRESS">In Progress</Option>
                  <Option value="ACCEPTED">Accepted</Option>
                  <Option value="REFUSED">Refused</Option>
                </Select>
                <Button
                  className="mt-6 w-[12rem] bg-blue"
                  fullWidth
                  type="submit"
                >
                  Save Changes
                </Button>
              </form>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default EditDemandAdd;
