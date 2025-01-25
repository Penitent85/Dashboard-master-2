import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreatePharmacyComponent = ({ onSuccess }) => {
    const navigate = useNavigate();
    const [city, setCity] = useState([]);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        en_first_name: "",
        en_last_name: "",
        username: "",
        email: "",
        phone: "",
        is_active: "",
        password: "",
        password_confirmation: "",
        dob: "",
        ar_name: "",
        en_name: "",
        street_name: "",
        license_number: "",
        build_name: "",
        city_id: 1,
        pharmacy_phone: "",
    });
    const nav = useNavigate();
    useEffect(() => {
        const getCity = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/cities`, {
                    headers: {
                        Authorization: `${import.meta.env.VITE_AUTH_KEY}`,
                        "ngrok-skip-browser-warning": "sss",
                    },
                });
                console.log(res.data.data);

                setCity(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getCity();
    }, []);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };
    console.log(formData);

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const form = {
                ...formData,
            };

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/pharmacies`, form, {
                headers: {
                    Authorization: `${import.meta.env.VITE_AUTH_KEY}`,
                    "ngrok-skip-browser-warning": "sss",
                },
            });

            if (onSuccess) onSuccess();
            Swal.fire({
                title: "Pharmacy Created Successfully!",
                icon: "success",
                draggable: true,
            });
            navigate("/pharmacy");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErrors(error.response.data.error);
            } else {
                console.error("Error creating pharmacy:", error);
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
            <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">Create Pharmacy</h1>
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
                            value={formData.street_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("street_name")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Building Name</label>
                        <input
                            type="text"
                            name="build_name"
                            value={formData.build_name}
                            onChange={handleChange}
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
                            name="city_id"
                            value={formData.city_id}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        >
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
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("ar_name")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
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
                            name="en_first_name"
                            value={formData.en_first_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("ar_name")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">English last Name</label>
                        <input
                            type="text"
                            name="en_last_name"
                            value={formData.en_last_name}
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
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("ar_name")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
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
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("pharmacy_phone")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("dob")}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("password")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                        <input
                            type="password"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Street Name</label>
                        <input
                            type="text"
                            name="street_name"
                            value={formData.street_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("street_name")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Building Name</label>
                        <input
                            type="text"
                            name="build_name"
                            value={formData.build_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("build_name")}
                    </div>
                </div>
                <label className="me-5 inline-flex cursor-pointer items-center">
                    <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleChange}
                        className="peer sr-only"
                    />
                    <div className="peer relative mx-3 h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
                    <span className="mx-5 text-sm font-medium text-gray-900 dark:text-gray-300">{formData.is_active ? "Active" : "Inactive"}</span>
                </label>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="mt-8 w-full rounded-tl-3xl bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:w-auto"
                    >
                        Create Pharmacy
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePharmacyComponent;
