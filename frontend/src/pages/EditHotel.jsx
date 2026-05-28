import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const EditHotel = () => {
    const { hotelId } = useParams();

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

    return <div>{<ManageHotelForm hotel={hotelData} />}</div>;
};

export default EditHotel;
