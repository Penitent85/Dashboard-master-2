import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
const ViewPharmacy = () => {
    const [pharmacyData, setPharmacyData] = useState(null);
    const [error, setError] = useState("");
    const nav = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchPharmacyData = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/pharmacies/${id}`, {
                    headers: {
                        Authorization: `${import.meta.env.VITE_AUTH_KEY}`,
                        "ngrok-skip-browser-warning": "sss",
                    },
                });
                console.log("data", data);
                setPharmacyData(data.data);
            } catch (err) {
                console.error("Error fetching pharmacy data:", err);
                setError("Failed to fetch pharmacy details.");
            }
        };

        fetchPharmacyData();
    }, [id]);

    if (!pharmacyData)
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <p className="text-gray-500">Loading...</p>
            </div>
        );

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
                <div className="text-center">
                    <h1 className="mt-4 text-xl font-semibold text-gray-800">{pharmacyData.ar_name}</h1>
                    <p className="text-gray-500">{pharmacyData.en_name}</p>
                </div>

                {/* Basic Info */}
                <div className="mt-6 space-y-4">
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">City:</span>
                        <span className="text-gray-700">{pharmacyData.city}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Address:</span>
                        <span className="text-gray-700">{pharmacyData.address}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">License Number:</span>
                        <span className="text-gray-700">{pharmacyData.license_number}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Pharmacy Phone:</span>
                        <span className="text-gray-700">{pharmacyData.pharmacy_phone}</span>
                    </div>
                </div>

                {/* User Information */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-indigo-500">Owner Information</h2>
                    <div className="mt-4 space-y-4">
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-600">Owner Name:</span>
                            <span className="text-gray-700">
                                {" "}
                                {pharmacyData.user.first_name} {pharmacyData.user.last_name}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-600">Owner Phone:</span>
                            <span className="text-gray-700">{pharmacyData.user.phone}</span>
                        </div>
                    </div>
                </div>

                {/* Availability */}
                <button
                    onClick={() => nav("/pharmacy")}
                    className="mt-4 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-700"
                >
                    {" "}
                    Back to pharmacies
                </button>
            </div>
        </div>
    );
};

export default ViewPharmacy;
