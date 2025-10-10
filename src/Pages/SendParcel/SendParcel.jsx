import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { useLoaderData } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";




const generateTrackingID = () => {
    const date = new Date();
    const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `PCL-${datePart}-${rand}`;
};



const SendParcel = () => {
    const serviceCenters = useLoaderData();

    // Unique regions list
    const uniqRegions = [...new Set(serviceCenters.map((w) => w.region))];

    // Get service centers by region
    const getCentersByRegion = (region) =>
        serviceCenters.filter((w) => w.region === region);

    // Optional: Get covered areas for warehouse
    const getCoveredAreas = (region, warehouse) => {
        const center = serviceCenters.find(
            (w) => w.region === region && w.city === warehouse
        );
        return center ? center.covered_area : [];
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const parcelType = watch("parcelType");
    const senderRegion = watch("senderRegion");
    const receiverRegion = watch("receiverRegion");
    const senderWarehouse = watch("senderWarehouse");
    const receiverWarehouse = watch("receiverWarehouse");

    // ========================
    // On Submit Handler
    // ========================
    const onSubmit = (data) => {
        const weight = Number(data.parcelWeight) || 0;
        const regionSame = data.senderRegion === data.receiverRegion;

        let baseCost = 0;
        let extraCharge = 0;
        let totalCost = 0;

        if (data.parcelType === "Document") {
            baseCost = regionSame ? 60 : 80;
            totalCost = baseCost;
        } else if (data.parcelType === "Non-Document") {
            baseCost = regionSame ? 110 : 150;
            if (weight <= 3) {
                totalCost = baseCost;
            } else {
                const extraWeight = weight - 3;
                extraCharge = extraWeight * 40 + (regionSame ? 0 : 40);
                totalCost = baseCost + extraCharge;
            }
        }

        // SweetAlert2 modal
        Swal.fire({
            title: 'Delivery Cost Breakdown',
            icon: "info",
            html: `
                <div class="text-left text-base space-y-2">
                     <p><strong>Parcel Type:</strong> ${data.parcelType}</p>
                    <p><strong>Weight:</strong> ${weight} kg</p>
                    <p><strong>Delivery Zone:</strong> ${regionSame ? "Within Same District" : "Outside District"}</p>
                    <hr class="my-2"/>
                     <p><strong>Base Cost:</strong> ৳${baseCost}</p>
                     ${extraCharge > 0 ? `<p><strong>Extra Charges:</strong> ৳${extraCharge}</p>` : ""}
                    <hr class="my-2"/>
                    ${data.parcelType === "Non-Document" && weight > 3 ? `<p>Non-document over 3kg</p>` : ''}
                    ${!regionSame && data.parcelType === "Non-Document" ? `<p>+৳40 extra for outside district delivery</p>` : ''}
                    <hr class="my-2"/>
                    <p class="text-xl font-bold text-green-600">Total Cost: ৳${totalCost}</p>
                </div>
            `,
            showDenyButton: true,
            confirmButtonText: "💳 Proceed to Payment",
            denyButtonText: "✏️ Continue Editing",
            confirmButtonColor: "#16a34a",
            denyButtonColor: "#d3d3d3",
            customClass: {
                popup: "rounded-xl shadow-md px-6 py-6",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const parcelData = {
                    ...data,
                    deliveryCost: totalCost,
                    created_by: user.email,
                    payment_status: 'unpaid',
                    delivery_status: 'not_collected',
                    creation_date: new Date().toISOString(),
                    tracking_id: generateTrackingID(),
                };
                // console.log("📦 Parcel Saved to DB:", parcelData);

                axiosSecure.post('/parcels', parcelData)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Redirecting...",
                                text: "Proceeding to payment gateway.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false,
                            });
                            
                        }
                    })


                reset();
            }
        });
    };

    return (
        <div className="w-11/12 mx-auto bg-gray-50 -mb-28 flex justify-center py-10 px-4">
            <div className="bg-white rounded-lg shadow-md w-full max-w-6xl p-8">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Add Parcel</h1>
                <p className="text-gray-600 text-2xl font-semibold mb-8">
                    Enter your parcel details
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Parcel Type */}
                    <div className="flex flex-wrap items-center gap-6 mb-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="Document"
                                {...register("parcelType", { required: true })}
                                defaultChecked
                            />
                            <span>Document</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="Non-Document"
                                {...register("parcelType", { required: true })}
                            />
                            <span>Non-Document</span>
                        </label>
                    </div>
                    {errors.parcelType && (
                        <p className="text-red-500 text-sm mb-4">Parcel type is required</p>
                    )}

                    {/* Parcel Details */}
                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                        <div>
                            <label className="block text-sm font-medium mb-2">Parcel Name</label>
                            <input
                                type="text"
                                {...register("parcelName", { required: true })}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
                                placeholder="Parcel Name"
                            />
                            {errors.parcelName && (
                                <p className="text-red-500 text-sm mt-1">Parcel name is required</p>
                            )}
                        </div>

                        {parcelType === "Non-Document" && (
                            <div>
                                <label className="block text-sm font-medium mb-2">Parcel Weight (KG)</label>
                                <input
                                    type="number"
                                    {...register("parcelWeight")}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
                                    placeholder="Parcel Weight (optional)"
                                />
                            </div>
                        )}
                    </div>

                    {/* Sender & Receiver Details */}
                    <div className="grid md:grid-cols-2 gap-10 mb-8">
                        {/* Sender */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Sender Details</h2>
                            <div className="space-y-4">
                                <input
                                    {...register("senderName", { required: true })}
                                    className="w-full border rounded-md px-3 py-2"
                                    placeholder="Sender Name"
                                />
                                <select
                                    {...register("senderRegion", { required: true })}
                                    className="w-full border rounded-md px-3 py-2"
                                >
                                    <option value="">Select Region</option>
                                    {uniqRegions.map((r) => (
                                        <option key={r} value={r}>
                                            {r}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    {...register("senderWarehouse", { required: true })}
                                    className="w-full border rounded-md px-3 py-2"
                                >
                                    <option value="">Select Warehouse</option>
                                    {senderRegion &&
                                        getCentersByRegion(senderRegion).map((w) => (
                                            <option key={w.city} value={w.city}>
                                                {w.city}
                                            </option>
                                        ))}
                                </select>
                                {senderWarehouse && (
                                    <select
                                        {...register("senderCoveredArea")}
                                        className="w-full border rounded-md px-3 py-2"
                                    >
                                        <option value="">Select Covered Area</option>
                                        {getCoveredAreas(senderRegion, senderWarehouse).map((area) => (
                                            <option key={area} value={area}>
                                                {area}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                <input
                                    {...register("senderAddress", { required: true })}
                                    className="w-full border rounded-md px-3 py-2"
                                    placeholder="Address"
                                />
                                <input
                                    {...register("senderContact", { required: true })}
                                    className="w-full border rounded-md px-3 py-2"
                                    placeholder="Sender Contact No"
                                />
                                <textarea
                                    {...register("pickupInstruction")}
                                    className="w-full border rounded-md px-3 py-2"
                                    rows="2"
                                    placeholder="Pickup Instruction"
                                />
                            </div>
                        </div>

                        {/* Receiver */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Receiver Details</h2>
                            <div className="space-y-4">
                                <input
                                    {...register("receiverName", { required: true })}
                                    className="w-full border rounded-md px-3 py-2"
                                    placeholder="Receiver Name"
                                />
                                <select
                                    {...register("receiverRegion", { required: true })}
                                    className="w-full border rounded-md px-3 py-2"
                                >
                                    <option value="">Select Region</option>
                                    {uniqRegions.map((r) => (
                                        <option key={r} value={r}>
                                            {r}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    {...register("receiverWarehouse", { required: true })}
                                    className="w-full border rounded-md px-3 py-2"
                                >
                                    <option value="">Select Warehouse</option>
                                    {receiverRegion &&
                                        getCentersByRegion(receiverRegion).map((w) => (
                                            <option key={w.city} value={w.city}>
                                                {w.city}
                                            </option>
                                        ))}
                                </select>
                                {receiverWarehouse && (
                                    <select
                                        {...register("receiverCoveredArea")}
                                        className="w-full border rounded-md px-3 py-2"
                                    >
                                        <option value="">Select Covered Area</option>
                                        {getCoveredAreas(receiverRegion, receiverWarehouse).map((area) => (
                                            <option key={area} value={area}>
                                                {area}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                <input
                                    {...register("receiverAddress", { required: true })}
                                    className="w-full border rounded-md px-3 py-2"
                                    placeholder="Receiver Address"
                                />
                                <input
                                    {...register("receiverContact", { required: true })}
                                    className="w-full border rounded-md px-3 py-2"
                                    placeholder="Receiver Contact No"
                                />
                                <textarea
                                    {...register("deliveryInstruction")}
                                    className="w-full border rounded-md px-3 py-2"
                                    rows="2"
                                    placeholder="Delivery Instruction"
                                />
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-6">* Pickup Time 4pm–7pm Approx.</p>

                    <div>
                        <button
                            type="submit"
                            className="bg-[#b0e611] text-white font-medium px-6 py-2 rounded hover:bg-green-600"
                        >
                            Proceed to Confirm Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SendParcel;
