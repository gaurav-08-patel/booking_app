import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toast";
import { CiMap } from "react-icons/ci";
import { FaBed, FaBuilding, FaMoneyBillWave, FaStar } from "react-icons/fa";

const MyHotels = () => {
    const getHotels = async () => {
        let response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/myHotels`,
            {
                credentials: "include",
            },
        );

        let responseBody = await response.json();
        if (!response.ok) {
            throw new Error(responseBody.message);
        }

        return responseBody;
    };

    let { data, isLoading } = useQuery({
        queryKey: ["myHotels"],
        queryFn: getHotels,
        onError: (error) => {
            console.log("error", error.message);
            toast(error.message, {
                backgroundColor: "#FF2C2C",
                color: "white",
            });
        },
    });

    // console.log(data);

    // if (data) return <p>No hotels found</p>;

    return (
        <div className="max-w-4xl mx-auto p-2 space-y-6">
            <span className="flex justify-between">
                <h1 className="text-3xl font-bold ">My Hotels</h1>
                <Link
                    className="p-2 bg-blue-600 text-white font-semibold"
                    to="/addHotel"
                >
                    Add Hotel
                </Link>
            </span>
            <div className="flex flex-col gap-5">
                {isLoading ? (
                    <p className="text-center">Loading...</p>
                ) : data && data.length > 0 ? (
                    data.map((hotel) => (
                        <div
                            key={hotel._id}
                            className="border border-slate-400 p-4 rounded space-y-3"
                        >
                            <h2 className="text-2xl font-semibold">
                                {hotel.name}
                            </h2>
                            <p className="text-sm text-gray-700">
                                {hotel.description}
                            </p>

                            <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2">
                                <span className="flex items-center gap-2 border border-slate-400 px-2 py-1 rounded text-[12px] text-gray-700">
                                    <CiMap /> {hotel.city}, {hotel.country}
                                </span>
                                <span className="flex items-center gap-2 border border-slate-400 px-2 py-1 rounded text-[12px] text-gray-700">
                                    <FaBuilding /> {hotel.type}
                                </span>
                                <span className="flex items-center gap-2 border border-slate-400 px-2 py-1 rounded text-[12px] text-gray-700">
                                    <FaMoneyBillWave /> ${hotel.pricePerNight}{" "}
                                    per night
                                </span>
                                <span className="flex items-center gap-2 border border-slate-400 px-2 py-1 rounded text-[12px] text-gray-700">
                                    <FaBed /> {hotel.adultCount} adults,{" "}
                                    {hotel.childCount} child
                                </span>
                                <span className="flex items-center gap-2 border border-slate-400 px-2 py-1 rounded text-[12px] text-gray-700">
                                    <FaStar /> {hotel.starRating} star rating
                                </span>
                            </div>

                            <span className="flex justify-end">
                                <Link
                                    className="p-2 bg-blue-600 text-white font-semibold"
                                    to={`/editHotel/${hotel._id}`}
                                >
                                    View Details
                                </Link>
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No hotels found</p>
                )}
            </div>
        </div>
    );
};

export default MyHotels;
