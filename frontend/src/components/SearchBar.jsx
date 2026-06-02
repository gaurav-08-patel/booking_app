import { useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { FaGlobeAmericas } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "/node_modules/react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
    const search = useSearchContext();
    const location = useLocation();

    let showBanner =
        location.pathname === "/" || location.pathname === "/search"
            ? true
            : false;

    const [destination, setDestination] = useState(search.destination);
    const [checkIn, setCheckIn] = useState(search.checkIn);
    const [checkOut, setCheckOut] = useState(search.checkOut);
    const [adultCount, setAdultCount] = useState(search.adultCount);
    const [childCount, setChildCount] = useState(search.childCount);

    return (
        <form className={`${showBanner ? "grid" : "hidden"} w-full bg-orange-400  rounded shadow-md p-3 grid-cols-[repeat(5,minmax(150px,1fr))] max-lg:grid-cols-[repeat(3,minmax(150px,1fr))] gap-2 max-md:grid-cols-[repeat(2,minmax(150px,1fr))]`}>
            <div className="bg-white p-2 flex gap-1">
                <span>
                    <FaGlobeAmericas size={25} />
                </span>
                <input
                    placeholder="Enter destination "
                    className="focus:outline-none max-lg:text-sm"
                    value={destination}
                    onChange={(e) => {
                        setDestination(e.target.value);
                    }}
                />
            </div>
            <div className="bg-white p-2 flex   max-lg:text-sm">
                <label className="flex w-1/2 text-gray-500 overflow-hidden items-center">
                    Adults:
                    <input
                        type="number"
                        className="focus:outline-none text-black font-bold"
                        max={20}
                        min={1}
                        value={adultCount}
                        onChange={(e) => {
                            setAdultCount(Number(e.target.value));
                        }}
                    />
                </label>
                <label className="flex w-1/2 text-gray-500 overflow-hidden items-center">
                    Children:
                    <input
                        type="number"
                        className="focus:outline-none text-black font-bold"
                        min={0}
                        max={20}
                        value={childCount}
                        onChange={(e) => {
                            setChildCount(Number(e.target.value));
                        }}
                    />
                </label>
            </div>
            <div className="bg-white p-2 flex gap-1">
                <DatePicker
                    className="focus:outline-none max-lg:text-sm"
                    selected={checkIn}
                    onChange={(date) => {
                        setCheckIn(date);
                    }}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    placeholderText="Check-in Date"
                    minDate={new Date()}
                    maxDate={
                        new Date(
                            new Date().setFullYear(
                                new Date().getFullYear() + 1,
                            ),
                        )
                    }
                />
            </div>
            <div className="bg-white p-2 flex gap-1">
                <DatePicker
                    className="focus:outline-none max-lg:text-sm"
                    selected={checkOut}
                    onChange={(date) => {
                        setCheckOut(date);
                    }}
                    startDate={checkIn}
                    endDate={checkOut}
                    placeholderText="Check-out Date"
                    minDate={new Date()}
                />
            </div>
            <div className=" flex gap-1 max-lg:text-sm">
                <button
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4  w-2/3"
                    onClick={(e) => {
                        e.preventDefault();
                        search.saveSearchValues(
                            destination,
                            checkIn,
                            checkOut,
                            adultCount,
                            childCount,
                        );
                    }}
                >
                    Search
                </button>
                <button
                    className="bg-red-600 hover:bg-red-700 cursor-pointer text-white font-bold py-2 px-4  w-1/3"
                    onClick={(e) => {
                        e.preventDefault();
                        setDestination("");
                        setAdultCount(1);
                        setChildCount(0);
                        setCheckIn(new Date());
                        setCheckOut(new Date());
                    }}
                >
                    Clear
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
