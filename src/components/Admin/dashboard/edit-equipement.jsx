import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";

function EditEquipement() {
  const { auth } = useContext(AuthContext);

  const [equipement, setEquipement] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("");
  const [purchase_date, setPurchaseDate] = useState("");
  const [barcode, setBarcode] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    const fetchEquipement = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/equipements/getByid/${id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        setEquipement(response.data);
        // console.log("get equipement by id", response.data);
        setName(response.data.name);
        setDescription(response.data.description);
        setModel(response.data.model);
        setPurchaseDate(response.data.purchase_date);
        setBarcode(response.data.barcode);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching equipement:", error);
      }
    };

    fetchEquipement();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEquipement = {
      name,
      description,
      model,
      purchase_date,
      barcode,
      status,
    };
    // Send a PUT request to update the equipement data
    try {
      const response = await axios.put(
        `http://localhost:5001/equipements/update/${id}`,
        updatedEquipement,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      console.log("Equipement updated successfully:", response.data);
      toast.success("Equipement Updated Successfully");
      navigate("/Add-Equipement");
    } catch (error) {
      console.error("Error updating equipement:", error);
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
              Equipement Details
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div>
            <div>
              <Typography variant="h6" color="black">
                Name:
              </Typography>
              <Input
                size="regular"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Typography variant="h6" color="black">
                Description:
              </Typography>
              <Input
                size="regular"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Typography variant="h6" color="black">
                Model:
              </Typography>
              <Input
                size="regular"
                placeholder="Enter model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
              <Typography variant="h6" color="black">
                Purchase Date:
              </Typography>
              <Input
                size="regular"
                placeholder="Enter purchase date"
                value={purchase_date}
                onChange={(e) => setPurchaseDate(e.target.value)}
              />
              <Typography variant="h6" color="black">
                Barcode:
              </Typography>
              <Input
                size="regular"
                placeholder="Enter barcode"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
              />
              <Typography variant="h6" color="black">
                Status:
              </Typography>
              <Select
                value={status}
                onChange={(value) => setStatus(value)}
              >
                <option value="">-- Select status --</option>
                <option value="STATUS_1">En Panne</option>
                <option value="STATUS_2">In Maintenance</option>
                <option value="STATUS_3">Fixed</option>
              </Select>
              {/* <Typography variant="h6" color="black">
                Status:
              </Typography>
              <Input
                size="regular"
                placeholder="Enter barcode"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              /> */}
            </div>
            <div>
              <form onSubmit={handleSubmit}>
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

export default EditEquipement;
