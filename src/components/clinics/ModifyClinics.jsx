import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

const ModifyClinic = ({ onSuccess }) => {
    const { id } = useParams();
    console.log(id);
    const [loading, setloading] = useState(true);
    const [formData, setFormData] = useState({});
    const [formData2, setFormData2] = useState({});
const [token,setToken]=useState();
    useEffect(() => {
        const fetchPharmacyData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/clinics/${id}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "sss",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,

                    },
                });
                console.log(res);

                setFormData(res.data.data); // Assuming the API returns the pharmacy data in the correct format
                // setAddress(res.data.data.address.split(",") || "");
                // setBuild(res.data.data.address.split(",")[2] || "");
                // setStreet(res.data.data.address.split(",")[1] || "");
            } catch (error) {
                console.error("Error fetching pharmacy data:", error);
            }
        };

        const getCity = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/cities`, {
                    headers: {
                        "ngrok-skip-browser-warning": "sss",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log(res.data.data);
                
                setCity(res.data.data);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };
        const getDoctor = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/doctors-names`, {
                    headers: { "ngrok-skip-browser-warning": "sss" },
                    Authorization: `Bearer ${localStorage.getItem("token")}`,

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
                    headers: { "ngrok-skip-browser-warning": "sss" },
                    Authorization: import.meta.env.VITE_AUTH_KEY

                });
                console.log(res.data.data);
                setSpecial(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        getSP()
        getDoctor()
        fetchPharmacyData();
        getCity();
       setToken(localStorage.getItem("token"));
    }, [id]);
    console.log(formData);
    
    useEffect(() => {
        if (formData && formData.doctor && formData.specialist && formData.city) {
            setFormData2({
                doctor_id: formData.doctor.id,
                clinic_id: formData.licence_number,
                specialist_id: formData.specialist.id,
                city_id: formData.city.id,
                ar_name: formData.ar_name,
                en_name: formData.en_name,
                address: formData.address,
                appointment_time: formData.appointment_time,
                clinic_phone: formData.clinic_phone,
            });
        }
    }, [formData]);
    console.log(formData2);
    
    const navigate = useNavigate();
    const [city, setCity] = useState([]);
    

    const [address, setAddress] = useState([]);
    const [build, setBuild] = useState("");
    const [street, setStreet] = useState("");
        const [doctor, setDoctor] = useState([]);
        const [special, setSpecial] = useState([]);
  

    const [errors, setErrors] = useState({});
    const [city_id, setCityId] = useState();


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData2({
            ...formData2,
            [name]: type === "checkbox" ? checked : value,
        });
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(token);
        
        try {
            const address = `${street},${build}`;
            const form = {
                ...formData2,
                address: {
                    address_line_1: street, // Use streetName
                    address_line_2: build,  // Use buildName
                    address_line_3: formData2.ar_name, // Optional, use any other value for line_3
                },
            };



            await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/clinics/${id}`, form, {
                headers: {   Authorization: import.meta.env.VITE_AUTH_KEY,
                "ngrok-skip-browser-warning": "sss" ,
                

                },
            });

            if (onSuccess) onSuccess();
            Swal.fire({
                title: "Clinics Updated Successfully!",
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


    console.log(formData2);
    
    return (
   <div className="card">
        <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">Update Clinic</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="font-bold">Clinic Information</div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Arabic clinic Name</label>
                    <input
                        type="text"
                        name="ar_name"
                        value={formData2.ar_name}
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
                        value={formData2.en_name}
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
                        value={street?street:formData2?.address?.address_line_1}
                        
                        onChange={(e) => setStreet(e.target.value)} // Update streetName state
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    />
                    {renderError("street_name")}
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Building Name</label>
                    <input
                        type="text"
                        value={build?build:formData2.address?.address_line_2}
                        onChange={(e) => setBuild(e.target.value)} // Update buildName state
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
                        value={formData2.clinic_id}
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
                        value={city.find((option) => option.id === formData2.city_id) && {
                            value: formData2.city_id,
                            label: `${city.find((option) => option.id === formData2.city_id).en_name} / ${city.find((option) => option.id === formData2.city_id).ar_name}`,
                        }}
                        onChange={(selectedOption) => {
                            setFormData2((prevState) => ({
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
                        value={formData2.clinic_phone}
                        min={8}
                        max={9}
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
    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
        Select Doctor
    </label>
    <Select
        options={doctor.map((doctor) => ({
            value: doctor.id,
            label: doctor.name,
        }))} // List of doctor options
        value={(() => {
            if (!formData2.doctor_id || !Array.isArray(doctor)) return null;
            const selectedDoctor = doctor.find((option) => option.id === formData2.doctor_id);
            
            
            return selectedDoctor ? {value:selectedDoctor.id,label:selectedDoctor.name }: null;
        })()}
        onChange={(selectedOption) => {
            setFormData2((prevState) => ({
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
<label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
Select Specialty
</label>
<Select
options={special.map((specialty) => ({
value: specialty.id,
label:` ${specialty.en_name} / ${specialty.ar_name}`,
}))} // Generate specialty options dynamically
value={(() => {
    if (!formData2.specialist_id || !Array.isArray(special)) return null;
    const selectedDoctor = special.find((option) => option.id == formData2.specialist_id);
    
    
    return selectedDoctor ? {value:selectedDoctor.id,label:selectedDoctor.en_name+" / "+selectedDoctor.ar_name }: null;
})()}
onChange={(selectedOption) => {
setFormData2((prevState) => ({
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
                    className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Update Clinic
                </button>
            </div>
        </form>
    </div>
    );
};

export default ModifyClinic;
