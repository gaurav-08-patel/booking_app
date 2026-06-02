import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const searchContext = createContext({});

export const SearchContextProvider = ({ children }) => {
    const [destination, setDestination] = useState("");
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());
    const [adultCount, setAdultCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [hotelId, setHotelId] = useState("");

    const saveSearchValues = (
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
    ) => {
        setDestination(destination);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setAdultCount(adultCount);
        setChildCount(childCount);
        if (hotelId) {
            setHotelId(hotelId);
        }
    };

    return (
        <searchContext.Provider
            value={{
                destination,
                checkIn,
                checkOut,
                adultCount,
                childCount,
                hotelId,
                saveSearchValues,
            }}
        >
            {children}
        </searchContext.Provider>
    );
};

export const useSearchContext = () => useContext(searchContext);
