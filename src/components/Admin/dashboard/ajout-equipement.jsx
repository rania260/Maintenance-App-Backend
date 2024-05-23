import React, { useContext, useState } from "react";
import axios from "axios";
import { Button, Card, Input, Select, Typography } from "@material-tailwind/react";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AjoutEquipement() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("");
  const [purchase_date, setPurchaseDate] = useState("");
  const [barcode, setBarcode] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEquipement = {
      name,
      description,
      model,
      purchase_date,
      barcode,
      status,
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/equipements/createEquipement",
        newEquipement,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

      toast.info("Equipment Added Successfully");
      navigate("/Add-Equipement");
    } catch (error) {
      console.error("Error adding equipment:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card color="transparent" shadow={false}>
        <Typography color="gray" className="mt-1 font-normal">
          Enter equipment details:
        </Typography>

        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Name
            </Typography>
            <Input
              size="lg"
              placeholder="Equipment Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Description
            </Typography>
            <Input
              size="lg"
              placeholder="Equipment Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Model
            </Typography>
            <Input
              size="lg"
              placeholder="Equipment Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Purchase Date
            </Typography>
            <Input
              size="lg"
              type="date"
              value={purchase_date}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Barcode
            </Typography>
            <Input
              size="lg"
              placeholder="Equipment Barcode"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Status
            </Typography>
            <Input
              size="lg"
              placeholder="Equipment Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />
          </div>

          <Button type="submit" className="mt-6 bg-blue" fullWidth>
            Add
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default AjoutEquipement;
