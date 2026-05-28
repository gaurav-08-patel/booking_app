import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { toast } from "react-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddHotel = () => {
    const navigate = useNavigate();
    let [ isLoading, setIsLoading ] = useState(false);
    const addMyHotel = async (formData) => {
        setIsLoading(true);
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/myHotels/upload`,
            {
                method: "POST",
                body: formData,
                credentials: "include",
            },
        );

        if (!response.ok) throw new Error(response.message);
        let data = await response.json();
        setIsLoading(false);
        return data;
    };

    const { mutate } = useMutation({
        mutationFn: addMyHotel,
        onSuccess: (data) => {
            console.log(data);
            toast(data?.message || "Hotel saved", {
                backgroundColor: "#00CF00",
                color: "white",
            });
            navigate("/myHotels");
        },
        onError: (error) => {
            toast("Something went wrong", {
                backgroundColor: "#FF2C2C",
                color: "white",
            });
        },
    });

    function handleSave(formData) {
        mutate(formData);
    }
    return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
