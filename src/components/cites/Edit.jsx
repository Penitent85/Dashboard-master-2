import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const ModifyCityComponent = ({ onSuccess }) => {
    const { id } = useParams();
    console.log(id);

    const navigate = useNavigate();
    const [city, setCity] = useState([]);
    const [formData, setFormData] = useState({});
    const [address, setAddress] = useState([]);
    const [build, setBuild] = useState("");
    const [street, setStreet] = useState("");
    console.log(address);

    const [errors, setErrors] = useState({});
    const [city_id, setCityId] = useState();
    useEffect(() => {
        const fetchPharmacyData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/cities/${id}`, {
                    headers: {
                        Authorization: `${import.meta.env.VITE_AUTH_KEY}`,
                        "ngrok-skip-browser-warning": "sss",
                    },
                });
                console.log(res);

                setFormData(res.data); // Assuming the API returns the pharmacy data in the correct format
            } catch (error) {
                console.error("Error fetching pharmacy data:", error);
            }
        };

        fetchPharmacyData();
    }, [id]);
    console.log(formData);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };
    console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = {
                ...formData, 
            };

            const dataPayload = {
                ar_name: formData.ar_name,
                en_name: formData.en_name,
            };
            console.log(dataPayload);

            await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/cities/${id}`, dataPayload, {
                headers: { 
                    Authorization: `${import.meta.env.VITE_AUTH_KEY}`, 
                    "ngrok-skip-browser-warning": "sss" },

            });

            if (onSuccess) onSuccess();
            Swal.fire({
                title: "City Updated Successfully!",
                icon: "success",
                draggable: true,
            });
            navigate("/cites");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErrors(error.response.data.error);
            } else {
                console.error("Error updating pharmacy:", error);
                alert("An unexpected error occurred. Please try again.");
            }
        }
    };

    const renderError = (field) => {
        return errors[field] ? (
            <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors[field].map((error, index) => (
                    <p key={index}>{error}</p>
                ))}
            </div>
        ) : null;
    };

    return (
        <div className="card">
            <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">Edit City</h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Arabic City Name</label>
                        <input
                            type="text"
                            name="ar_name"
                            value={formData.ar_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("ar_name")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">English City Name</label>
                        <input
                            type="text"
                            name="en_name"
                            value={formData.en_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("en_name")}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="mt-8 w-full rounded-tl-3xl bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:w-auto"
                    >
                        Edit City
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModifyCityComponent;
