import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const EditPharmacyComponent = ({ onSuccess }) => {
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
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/pharmacies/${id}`, {
                    headers: {
                        Authorization: `${import.meta.env.VITE_AUTH_KEY}`,
                        "ngrok-skip-browser-warning": "sss",
                    },
                });
                console.log(res.data.data);

                setFormData(res.data.data); // Assuming the API returns the pharmacy data in the correct format
                setAddress(res.data.data.address.split(",") || "");
                setBuild(res.data.data.address.split(",")[2] || "");
                setStreet(res.data.data.address.split(",")[1] || "");
            } catch (error) {
                console.error("Error fetching pharmacy data:", error);
            }
        };

        const getCity = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/cities`, {
                    headers: {
                        Authorization: `${import.meta.env.VITE_AUTH_KEY}`,
                        "ngrok-skip-browser-warning": "sss",
                    },
                });
                setCity(res.data.data);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };

        fetchPharmacyData();
        getCity();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("user.")) {
            const userField = name.split(".")[1];
            setFormData({
                ...formData,
                user: {
                    ...formData.user,
                    [userField]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };
    console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const address = `${street},${build}`;
            const form = {
                ...formData,
                build_name: build,
                street_name: street,
            };

            if (isNaN(formData.city)) {
                const getCityIdByName = (cityName) => {
                    const cityObj = city.find((city) => city.en_name === cityName || city.ar_name === cityName);
                    return cityObj ? cityObj.id : null; // Return the id if found, otherwise return null
                };
                formData.city = getCityIdByName(formData.city);
            }

            const dataPayload = {
                first_name: formData.user.first_name,
                last_name: formData.user.last_name,
                en_first_name: formData.user.en_first_name,
                en_last_name: formData.user.en_last_name,
                username: formData.user.username,
                email: formData.user.email,
                phone: formData.user.phone,
                dob: formData.user.dob,
                ar_name: formData.ar_name,
                en_name: formData.en_name,
                street_name: street,
                build_name: build,
                city_id: formData.city,
                pharmacy_phone: formData.pharmacy_phone,
                license_number: formData.license_number,
                _token: "QD1NjNczCEnrT33IoFbgdYWVhRcs6GkGz1rF5Hdd",
            };
            console.log(dataPayload);

            await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/pharmacies/${id}`, dataPayload, {
                Authorization: `${import.meta.env.VITE_AUTH_KEY}`,
                headers: { "ngrok-skip-browser-warning": "sss" },
            });

            if (onSuccess) onSuccess();
            Swal.fire({
                title: "Pharmacy Updated Successfully!",
                icon: "success",
                draggable: true,
            });
            // navigate("/pharmacies");
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
    const filterCity = (city) => {
        city.filter((ele) => {
            ele.id === city;
        });
    };

    return (
        <div className="card">
            <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">Edit Pharmacy</h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <div className="font-bold">Pharmacy Information</div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Arabic Pharmacy Name</label>
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
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">English Pharmacy Name</label>
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Street Name</label>
                        <input
                            type="text"
                            name="street_name"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("street_name")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Building Name</label>
                        <input
                            type="text"
                            name="build_name"
                            value={build}
                            onChange={(e) => setBuild(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("build_name")}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">License Number</label>
                        <input
                            type="text"
                            name="license_number"
                            value={formData.license_number}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("license_number")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        >
                            <option value={formData.city}>{formData.city}</option>
                            {city.map((city) => (
                                <option
                                    key={city.id}
                                    value={city.id}
                                >
                                    {city.en_name} / {city.ar_name}
                                </option>
                            ))}
                        </select>
                        {renderError("city_id")}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Pharmacy Phone Number</label>
                        <input
                            type="tel"
                            name="pharmacy_phone"
                            value={formData.pharmacy_phone}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("pharmacy_phone")}
                    </div>
                </div>
                <div className="font-bold">Pharmacist Information</div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                        <input
                            type="text"
                            name="user.first_name"
                            value={formData?.user?.first_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("ar_name")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">last Name</label>
                        <input
                            type="text"
                            name="user.last_name"
                            value={formData?.user?.last_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("en_name")}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">English First Name</label>
                        <input
                            type="text"
                            name="user.en_first_name"
                            value={formData?.user?.en_first_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("ar_name")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">English last Name</label>
                        <input
                            type="text"
                            name="user.en_last_name"
                            value={formData?.user?.en_last_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("en_name")}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="text"
                            name="user.email"
                            value={formData?.user?.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("ar_name")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                        <input
                            type="text"
                            name="user.username"
                            value={formData?.user?.username}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("en_name")}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                        <input
                            type="tel"
                            name="user.phone"
                            value={formData?.user?.phone}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("pharmacy_phone")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
                        <input
                            type="date"
                            name="user.dob"
                            value={formData?.user?.dob}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("dob")}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="mt-8 w-full rounded-tl-3xl bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:w-auto"
                    >
                        Update Pharmacy
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPharmacyComponent;
