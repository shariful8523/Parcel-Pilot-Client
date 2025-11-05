import { useForm } from "react-hook-form";
import riderImage from "../../../assets/agent-pending.png";
import useAuth from "../../../Hooks/useAuth";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { Title } from "react-head";

const BeARider = () => {
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [availableDistricts, setAvailableDistricts] = useState([]);
    const [availableWarehouses, setAvailableWarehouses] = useState([]);
    const axiosSecure = useAxiosSecure();

    const serviceCenters = useLoaderData(); // JSON data

    const regions = [...new Set(serviceCenters.map((s) => s.region))];

    useEffect(() => {
        if (selectedRegion) {
            const districts = serviceCenters
                .filter((s) => s.region === selectedRegion)
                .map((s) => s.district);
            setAvailableDistricts(districts);
            setSelectedDistrict("");
            setAvailableWarehouses([]);
        } else {
            setAvailableDistricts([]);
            setSelectedDistrict("");
            setAvailableWarehouses([]);
        }
    }, [selectedRegion, serviceCenters]);

    useEffect(() => {
        if (selectedDistrict) {
            const warehouse = serviceCenters.find(
                (s) => s.district === selectedDistrict
            );
            setAvailableWarehouses(warehouse?.covered_area || []);
        } else {
            setAvailableWarehouses([]);
        }
    }, [selectedDistrict, serviceCenters]);

    const onSubmit = async (data) => {
        const riderData = {
            ...data,
            name: user?.displayName || "",
            email: user?.email || "",
            status: "pending",
            created_at: new Date().toISOString(),
        };

        axiosSecure.post('/riders', riderData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Application Submitted!",
                        text: "Your application is pending approval.",
                    });
                }
            });

        reset();
        setSelectedRegion("");
        setSelectedDistrict("");
    };

    return (

        <>
        <Title> Parcel Pilot || Be A Rider </Title>
        <div className="w-11/12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between p-10 bg-gray-50 rounded-2xl shadow-sm">
            <div className="flex-1 w-full lg:max-w-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Be a Rider</h2>
                <p className="text-gray-500 mb-6 leading-relaxed">
                    Enjoy fast, reliable parcel delivery with real-time tracking.
                </p>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Name (readonly) */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Your Name</label>
                            <input
                                {...register("name")}
                                defaultValue={user?.displayName || ""}
                                readOnly
                                className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        {/* Email (readonly) */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Your Email</label>
                            <input
                                {...register("email")}
                                defaultValue={user?.email || ""}
                                readOnly
                                className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        {/* Age */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Your Age</label>
                            <input
                                type="number"
                                {...register("age", { required: true, min: 18 })}
                                placeholder="Your Age"
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                            />
                            {errors.age && <span className="text-red-500 text-sm">Valid age is required</span>}
                        </div>

                        {/* NID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">NID Number</label>
                            <input
                                type="text"
                                {...register("nid", { required: true })}
                                placeholder="NID Number"
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                            />
                            {errors.nid && <span className="text-red-500 text-sm">NID is required</span>}
                        </div>

                        {/* Contact Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                            <input
                                type="text"
                                {...register("contact", { required: true })}
                                placeholder="Contact Number"
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                            />
                            {errors.contact && <span className="text-red-500 text-sm">Contact is required</span>}
                        </div>

                        {/* Region */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Region</label>
                            <select
                                {...register("region", { required: true })}
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                                onChange={(e) => setSelectedRegion(e.target.value)}
                                value={selectedRegion}
                            >
                                <option value="">Select region</option>
                                {regions.map((region) => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                            {errors.region && <span className="text-red-500 text-sm">Region is required</span>}
                        </div>

                        {/* District */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">District</label>
                            <select
                                {...register("district", { required: true })}
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                value={selectedDistrict}
                            >
                                <option value="">Select district</option>
                                {availableDistricts.map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                            {errors.district && <span className="text-red-500 text-sm">District is required</span>}
                        </div>

                        {/* Warehouse / Covered Area */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Warehouse / Covered Area</label>
                            <select
                                {...register("warehouse", { required: true })}
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                            >
                                <option value="">Select covered area</option>
                                {availableWarehouses.map((area) => (
                                    <option key={area} value={area}>{area}</option>
                                ))}
                            </select>
                            {errors.warehouse && <span className="text-red-500 text-sm">Area is required</span>}
                        </div>

                        {/* Submit */}
                        <div className="sm:col-span-2">
                            <button
                                type="submit"
                                className="w-full py-3 bg-lime-400 hover:bg-lime-500 text-white font-medium rounded-md transition"
                            >
                                Submit
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 hidden lg:flex items-center justify-center mt-10 lg:mt-0">
                <img src={riderImage} alt="Rider" className="max-w-md w-full" />
            </div>
        </div>
        </>
        
    );
};

export default BeARider;
