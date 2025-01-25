import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const CreateDoctorComponent = ({ onSuccess }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id_number: "",
        gender: "male",
        blood_type: "O+",
        emergency_contact_name: "",
        emergency_contact_phone: "",
        first_name: "",
        last_name: "",
        username: "",
        phone: "",
        is_active: true,
        password: "",
        password_confirmation: "",
        dob: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log(name, value);
        if (value === "gender") {
            setFormData({
                ...formData,
                gender: name,
            });
        }
        if (value === "blood_type") {
            setFormData({
                ...formData,
                blood_type: name,
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === "checkbox" ? checked : value,
            });
        }
    };



    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const form = {
                ...formData,
            };
            console.log("form", form);

            await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/patients/${id}`, form, {
                headers: {
                    Authorization: `${import.meta.env.VITE_AUTH_KEY}`,
                    "ngrok-skip-browser-warning": "sss",
                },
            });

            if (onSuccess) onSuccess();
            Swal.fire({
                title: " Patine Updated Successful!",
                icon: "success",
                draggable: true,
            });
            navigate("/patients");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErrors(error.response.data.error);
            } else {
                console.error("Error creating doctor:", error);
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

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
               const {data} =   await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/patients/${id}`, {
                    headers: {
                        Authorization: `${import.meta.env.VITE_AUTH_KEY}`,
                        "ngrok-skip-browser-warning": "sss",
                    },
                });
                console.log("data", data);
                setFormData({
                    id_number: data.data.id_number,
                    first_name: data.data.user.first_name,
                    last_name: data.data.user.last_name,
                    gender: data.data.gender,
                    blood_type: data.data.blood_type,
                    emergency_contact_name: data.data.emergency_contact_name,
                    emergency_contact_phone: data.data.emergency_contact_phone,
                    phone: data.data.user.phone,
                    username: data.data.user.username,
                    dob: data.data.user.dob,
                });

            } catch (err) {
                console.error("Error fetching patient data:", err);
                alert("Failed to fetch patient details.");
            }
        };
        if (id) fetchPatientData();
    }, [id]);

    return (
        <div className="card">
            <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">Create Doctor</h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
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
                        {renderError("first_name")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("last_name")}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
                        <select
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            onChange={handleChange}
                            value={formData.gender}
                            id="gender"
                            name="gender"
                        >
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Blood Type</label>
                        <select
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            onChange={handleChange}
                            value={formData.blood_type}
                            id="blood_type"
                            name="blood_type"
                        >
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="AB">AB</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("username")}
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
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("phone")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">ID Number</label>
                        <input
                            type="text"
                            name="id_number"
                            value={formData.id_number}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("id_number")}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Emergency Contact Name</label>
                        <input
                            type="text"
                            name="emergency_contact_name"
                            value={formData.emergency_contact_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("emergency_contact_name")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Emergency Contact Phone</label>
                        <input
                            type="text"
                            name="emergency_contact_phone"
                            value={formData.emergency_contact_phone}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("emergency_contact_phone")}
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

                    <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {formData.is_active ? "Active  " : "Inactive  "}
                    </span>
                </label>

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
                <div className="flex justify-end">
                    <button
                    onClick={handleSubmit}
                        type="submit"
                        className="mt-8 w-full rounded-tl-3xl bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:w-auto"
                    >
                        Edit Patient
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateDoctorComponent;
