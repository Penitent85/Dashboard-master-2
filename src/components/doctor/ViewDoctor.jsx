import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams , useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const ViewDoctorComponent = () => {
    const navigate = useNavigate();
    
    const [doctorData, setDoctorData] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [user, setUser] = useState(null);
    const [newAvatar, setNewAvatar] = useState("");

    const [error, setError] = useState("");

    const { id } = useParams();

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/doctors/${id}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "sss",
                        Authorization: `${import.meta.env.VITE_AUTH_KEY}`,
                    },
                });
                console.log("data", data);
                setUser(data.data);
            } catch (err) {
                console.error("Error fetching doctor data:", err);
                setError("Failed to fetch doctor details.");
            }
        };

        fetchDoctorData();
    }, [id]);

    if (!user)
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <p className="text-gray-500">Loading...</p>
            </div>
        );

    // handle image change
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                // Convert image to JPG
                convertToJpg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // convert

    const convertToJpg = (imageDataUrl) => {
        const img = new Image();
        img.src = imageDataUrl;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Set canvas dimensions
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the image on the canvas
            ctx.drawImage(img, 0, 0);

            // Convert canvas content to JPG format
            const jpgDataUrl = canvas.toDataURL("image/jpeg", 0.9); // Adjust quality as needed (0.1 - 1)
            setNewAvatar(jpgDataUrl); // Set the preview to the converted image
        };
    };

    // Save the image
    // Save the image
    const handleSaveImage = () => {
        const handleUpload = async () => {
            if (!newAvatar) {
                alert("No new image to upload.");
                return;
            }

            // Convert base64 data URL to a file object
            const convertBase64ToFile = (base64, fileName) => {
                const arr = base64.split(",");
                const mime = arr[0].match(/:(.*?);/)[1];
                const bstr = atob(arr[1]);
                let n = bstr.length;
                const u8arr = new Uint8Array(n);

                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }

                return new File([u8arr], fileName, { type: mime });
            };

            // Convert `newAvatar` to a file
            const avatarFile = convertBase64ToFile(newAvatar, "avatar.jpg");

            const formData = new FormData();
            formData.append("avatar", avatarFile);
            formData.append("user_id", user.id);

            try {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/user/avatar`, formData, {
                    headers: {
                        "ngrok-skip-browser-warning": "sss",
                        Authorization: `${import.meta.env.VITE_AUTH_KEY}`,
                    },
                });

                // Update user avatar on successful upload
                setUser({ ...user, avatar: newAvatar });
                Swal.fire({
                    title: "Photo Updated",
                    icon: "success",
                    draggable: true
                  });
                
                  navigate("/doctors");
                // alert("Image updated successfully!");
            } catch (err) {
                console.error("Error uploading image:", err);
                alert("Failed to upload image.");
            }
        };

        handleUpload();
    };

    if (user)
        return (
            <>
                <div className="flex min-h-screen items-center justify-center bg-gray-50">
                    <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
                        <div className="text-center">
                            <img
                                src={newAvatar || user.avatar}
                                alt={user.en_full_name}
                                className="mx-auto h-24 w-24 rounded-full border-2 border-indigo-500"
                            />
                            <h1 className="mt-4 text-xl font-semibold text-gray-800">{user.en_full_name}</h1>
                            <p className="text-gray-500">Edit your profile picture</p>
                        </div>

                        {/* Edit Image */}
                        <div className="mt-6">
                            <label
                                htmlFor="avatarInput"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Upload New Image
                            </label>
                            <input
                                id="avatarInput"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-600 hover:file:bg-indigo-100"
                            />
                        </div>

                        {/* Save Button */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={handleSaveImage}
                                className="rounded-md bg-indigo-500 px-4 py-2 text-white shadow hover:bg-indigo-600"
                            >
                                Save Image
                            </button>
                        </div>
                        {/* Basic Info */}
                        <div className="mt-6 space-y-4">
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-600">Email:</span>
                                <span className="text-gray-700">{user.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-600">Phone:</span>
                                <span className="text-gray-700">{user.phone}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-600">Date of Birth:</span>
                                <span className="text-gray-700">{user.dob}</span>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold text-indigo-500">About</h2>
                            <p className="mt-2 text-gray-700">{user.about.overview}</p>
                            <ul className="mt-4 list-disc pl-6">
                                {user.about.qualifies.map((qualify, index) => (
                                    <li
                                        key={index}
                                        className="text-gray-700"
                                    >
                                        <span className="font-semibold">{qualify.name}</span> - {qualify.position}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Online Schedule */}
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold text-indigo-500">Online Schedule</h2>
                            <table className="mt-4 w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-2 py-1 text-left">Day</th>
                                        <th className="border border-gray-300 px-2 py-1 text-left">Start Time</th>
                                        <th className="border border-gray-300 px-2 py-1 text-left">End Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.online_schedule.map((schedule) => (
                                        <tr key={schedule.id}>
                                            <td className="border border-gray-300 px-2 py-1">{schedule.day}</td>
                                            <td className="border border-gray-300 px-2 py-1">{schedule.start_time}</td>
                                            <td className="border border-gray-300 px-2 py-1">{schedule.end_time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Availability */}
                        <div className="mt-6 text-center">
                            <span className={`rounded-full px-4 py-2 text-white ${user.available ? "bg-green-500" : "bg-red-500"}`}>
                                {user.available ? "Available" : "Unavailable"}
                            </span>
                        </div>
                    </div>
                </div>
            </>
        );
};

export default ViewDoctorComponent;
