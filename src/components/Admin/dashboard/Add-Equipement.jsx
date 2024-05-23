import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Card, CardBody, CardHeader, Chip, IconButton, Typography } from '@material-tailwind/react';
import { HiPencilAlt, HiPlus, HiTrash } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const AddEquipement = () => {
    const [equipementTableData, setEquipementTableData] = useState([]);
    const { auth } = useContext(AuthContext);
    const [cookies] = useCookies(["jwt"]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5001/equipements/getEquipement", {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                });

                setEquipementTableData(response.data);
                console.log("response data ", response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [auth.accessToken, cookies.jwt]);

    const handleDelete = async (equipementId) => {
        try {
            // Envoyer une requête DELETE au backend pour supprimer l'équipement
            await axios.delete(`http://localhost:5001/equipements/delete/${equipementId}`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            });

            // Mettre à jour les données d'équipement après suppression
            const updatedEquipements = equipementTableData.filter(equipement => equipement._id !== equipementId);
            setEquipementTableData(updatedEquipements);

            console.log("Equipement deleted successfully!");
        } catch (error) {
            console.error("Error deleting equipement:", error);
        }
    };


    return (
        <div className="flex-grow p-4">
            <Card>
                <CardHeader
                    variant="gradient"
                    style={{
                        background: "#0275d8",
                        padding: "12px 12px",
                        margin: "8px 0",
                        height: "3rem"
                    }}
                    className="mb-8 p-6"
                >
                    <div className="flex justify-between items-center">
                        <Typography variant="h6" color="white">
                            Equipement Add To Maintenance Agency Table
                        </Typography>
                        <Link to="/ajout-equipement">
                    <HiPlus color="white" size={24} />
                </Link>
                    </div>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {[
                                    "name",
                                    "Description",
                                    "model",
                                    "purchase_date",
                                    "status",
                                    "barcode",
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
                            {equipementTableData &&
                                equipementTableData.map(
                                    ({
                                        _id,
                                        name,
                                        description,
                                        model,
                                        purchase_date,
                                        status,
                                        barcode
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
                                                            {name}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {description}
                                                </Typography>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {model}
                                                </Typography>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {purchase_date}
                                                </Typography>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {status}
                                                </Typography>
                                            </td>
                                        
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {barcode}
                                                </Typography>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50 flex gap-4">
                                                <Link
                                                    to={`/edit-equipement/${_id}`}
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                >
                                                    <IconButton color="indigo">
                                                        <HiPencilAlt />
                                                    </IconButton>
                                        
                                                </Link>
                                                
                                                <IconButton color="red" onClick={() => handleDelete(_id)}>
                                                <HiTrash />
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

export default AddEquipement;


