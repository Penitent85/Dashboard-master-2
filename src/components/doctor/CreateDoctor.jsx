import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateDoctorComponent = ({ onSuccess }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        en_first_name: "",
        en_last_name: "",
        username: "",
        email: "",
        phone: "",
        is_active: true,
        password: "",
        password_confirmation: "",
        id_number: "",
        speciality: "",
        about: {
            overview: "",
            qualifies: [],
        },

        dob: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "overview") {
            setFormData({
                ...formData,

                about: { ...formData.about, overview: value },
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === "checkbox" ? checked : value,
            });
        }
    };

    const addQualification = () => {
        setFormData({
            ...formData,
            about: {
                ...formData.about,
                qualifies: [...formData.about.qualifies, { name: "", position: "" }],
            },
        });
    };

    const handleQualificationChange = (index, field, value) => {
        const updatedQualifies = formData.about.qualifies.map((qual, i) => (i === index ? { ...qual, [field]: value } : qual));
        setFormData({
            ...formData,
            about: {
                ...formData.about,
                qualifies: updatedQualifies,
            },
        });
    };

    const removeQualification = (index) => {
        const updatedQualifies = formData.about.qualifies.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            about: {
                ...formData.about,
                qualifies: updatedQualifies,
            },
        });
    };

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const form = {
                ...formData,
                about: { ...formData.about },
            };

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/doctors`, form, {
                headers: {
                    Authorization: `${import.meta.env.VITE_AUTH_KEY}`,
                    "ngrok-skip-browser-warning": "sss",
                },
            });

            if (onSuccess) onSuccess();
            Swal.fire({
                title: " Doctor Updated Successful!",
                icon: "success",
                draggable: true,
            });
            navigate("/doctors");
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
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">English First Name</label>
                        <input
                            type="text"
                            name="en_first_name"
                            value={formData.en_first_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("en_first_name")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">English Last Name</label>
                        <input
                            type="text"
                            name="en_last_name"
                            value={formData.en_last_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("en_last_name")}
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
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("email")}
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
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Speciality</label>
                        <input
                            type="text"
                            name="speciality"
                            value={formData.speciality}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("speciality")}
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
                {/* Overview */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Overview</label>
                    <textarea
                        name="overview"
                        value={formData.about.overview}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        rows="4"
                    />
                    {renderError("overview")}
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

                {/* Qualifications */}
                <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Qualifications</h3>
                    {formData.about.qualifies.map((qual, index) => (
                        <div
                            key={index}
                            className="mt-2 flex items-center space-x-4"
                        >
                            <input
                                type="text"
                                placeholder="Name"
                                value={qual.name}
                                onChange={(e) => handleQualificationChange(index, "name", e.target.value)}
                                className="w-1/2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            />

                            <input
                                type="text"
                                placeholder="Position"
                                value={qual.position}
                                onChange={(e) => handleQualificationChange(index, "position", e.target.value)}
                                className="w-1/2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            />

                            <button
                                type="button"
                                onClick={() => removeQualification(index)}
                                className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addQualification}
                        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Add Qualification
                    </button>
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
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="mt-8 w-full rounded-tl-3xl bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:w-auto"
                    >
                        Create Doctor
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateDoctorComponent;
