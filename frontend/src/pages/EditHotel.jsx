import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { toast } from "react-toast";
import { useState } from "react";

const EditHotel = () => {
    const navigate = useNavigate();
    const { hotelId } = useParams();
    const [loading, setLoading] = useState(false);

    // Get the hotel
    const { data: hotelData } = useQuery({
        queryKey: ["getHotelById", hotelId],
        queryFn: () =>
            fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/myHotels/${hotelId}`,
                {
                    credentials: "include",
                },
            )
                .then((res) => res.json())
                .catch((err) => {
                    console.log(err);
                    throw new Error(err.message);
                }),
        onError: (error) => {
            toast(error.message, {
                backgroundColor: "#FF2C2C",
                color: "white",
            });
        },
    });

    async function updateHotel(formData) {
        setLoading(true);
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/myHotels/update/${hotelId}`,
            {
                method: "PUT",
                body: formData,
                credentials: "include",
            },
        );
        setLoading(false);
        if (!response.ok) throw new Error("Something went wrong.");
        return await response.json();
    }

    const { mutate } = useMutation({
        mutationFn: updateHotel,
        onSuccess: () => {
            toast("Hotel updated", {
                backgroundColor: "#00CF00",
                color: "white",
            });
            navigate("/myHotels");
        },
        onError: (error) => {
            toast(error.message, {
                backgroundColor: "#FF2C2C",
                color: "white",
            });
        },
    });

    function handleSave(formData) {
        mutate(formData);
    }

    return (
        <div>
            {
                <ManageHotelForm
                    hotel={hotelData}
                    onSave={handleSave}
                    isLoading={loading}
                />
            }
        </div>
    );
};

export default EditHotel;
