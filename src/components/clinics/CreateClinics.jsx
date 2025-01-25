import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const CreateClinicComponent = ({ onSuccess }) => {
    const navigate = useNavigate();
    const [city, setCity] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [special, setSpecial] = useState([]);

    // Declare separate useState variables for street_name and build_name
    const [streetName, setStreetName] = useState("");
    const [buildName, setBuildName] = useState("");

    const [formData, setFormData] = useState({
        doctor_id: "",
        clinic_id: "",
        specialist_id: "",
        city_id: 1,
        ar_name: "",
        en_name: "",
        address: "",
        appointment_time: "",
        clinic_phone: "",
    });

    const doctorOptions = doctor.map((doctor) => ({
        value: doctor.id,
        label: doctor.name,
    }));

    useEffect(() => {
        const getCity = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/cities`, {
                    headers: { "ngrok-skip-browser-warning": "sss", Authorization: `${import.meta.env.VITE_AUTH_KEY}` },
                });
                console.log(res.data.data);

                setCity(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        const getDoctor = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/doctors-names`, {
                    headers: { "ngrok-skip-browser-warning": "sss", Authorization: `${import.meta.env.VITE_AUTH_KEY}` },
                });
                console.log(res.data);

                setDoctor(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        const getSP = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/categories`, {
                    headers: { "ngrok-skip-browser-warning": "sss", Authorization: `${import.meta.env.VITE_AUTH_KEY}` },
                });
                console.log(res.data.data);

                setSpecial(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        getSP();
        getCity();
        getDoctor();
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
                address: {
                    address_line_1: streetName, // Use streetName
                    address_line_2: buildName, // Use buildName
                    address_line_3: formData.ar_name, // Optional, use any other value for line_3
                },
            };

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/clinics`, form, {
                headers: { "ngrok-skip-browser-warning": "sss", Authorization: `${import.meta.env.VITE_AUTH_KEY}` },
            });

            if (onSuccess) onSuccess();
            Swal.fire({
                title: "Clinic Created Successfully!",
                icon: "success",
                draggable: true,
            });
            navigate("/clinics");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErrors(error.response.data.error);
            } else {
                console.error("Error creating clinic:", error);
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
            <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">Create Clinic</h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <div className="font-bold">Clinic Information</div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Arabic clinic Name</label>
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
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">English clinic Name</label>
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
                            value={streetName}
                            onChange={(e) => setStreetName(e.target.value)} // Update streetName state
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("street_name")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Building Name</label>
                        <input
                            type="text"
                            value={buildName}
                            onChange={(e) => setBuildName(e.target.value)} // Update buildName state
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
                            name="clinic_id"
                            value={formData.clinic_id}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("clinic_id")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Select City</label>
                        <Select
                            options={city.map((city) => ({
                                value: city.id,
                                label: `${city.en_name} / ${city.ar_name}`,
                            }))}
                            value={
                                city.find((option) => option.id === formData.city_id) && {
                                    value: formData.city_id,
                                    label: `${city.find((option) => option.id === formData.city_id).en_name} / ${city.find((option) => option.id === formData.city_id).ar_name}`,
                                }
                            }
                            onChange={(selectedOption) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    city_id: selectedOption ? selectedOption.value : "", // Save only the ID
                                }));
                            }}
                            name="city_id"
                            isClearable
                            placeholder="Select a city..."
                            classNamePrefix="react-select"
                        />
                        {renderError("city_id")}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Clinic Phone Number</label>
                        <input
                            type="tel"
                            name="clinic_phone"
                            value={formData.clinic_phone}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("clinic_phone")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Appointment Time</label>
                        <input
                            type="text"
                            name="appointment_time"
                            value={formData.appointment_time}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {renderError("appointment_time")}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Select Doctor</label>
                        <Select
                            options={doctorOptions} // List of doctor options
                            value={doctorOptions.find((option) => option.value === formData.doctor_id)} // Find the selected doctor option
                            onChange={(selectedOption) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    doctor_id: selectedOption ? selectedOption.value : "", // Save only the ID
                                }));
                            }}
                            name="doctor_id"
                            isClearable
                            placeholder="Select a doctor..."
                            classNamePrefix="react-select"
                        />
                        {renderError("doctor_id")}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Select Specialty</label>
                        <Select
                            options={special.map((specialty) => ({
                                value: specialty.id,
                                label: ` ${specialty.en_name} / ${specialty.ar_name}`,
                            }))} // Generate specialty options dynamically
                            value={
                                special.find((option) => option.id === formData.specialist_id) && {
                                    value: formData.specialist_id,
                                    label: `${special.find((option) => option.id === formData.specialist_id).en_name} / ${special.find((option) => option.id === formData.specialist_id).ar_name}`,
                                }
                            }
                            onChange={(selectedOption) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    specialist_id: selectedOption ? selectedOption.value : "", // Save only the ID
                                }));
                            }}
                            name="specialist_id"
                            isClearable
                            placeholder="Select a specialty..."
                            classNamePrefix="react-select"
                        />
                        {renderError("specialist_id")}
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Create Clinic
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateClinicComponent;
