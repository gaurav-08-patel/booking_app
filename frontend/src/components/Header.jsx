import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Header = () => {
    let { isLoggedIn } = useAppContext();

    return (
        <div className="bg-blue-800 py-6 p-1">
            <div className="container mx-auto flex justify-between ">
                <Link className="text-2xl text-white font-bold tracking-tight">
                    Mernholidays.com
                </Link>

                <span className="flex space-x-2">
                    {isLoggedIn ? (
                        <>
                            <Link
                                to={"profile"}
                                className="bg-white flex items-center text-blue-600 font-semibold hover:bg-gray-100 px-1"
                            >
                                My Hotels
                            </Link>
                            <Link
                                to={"logout"}
                                className="bg-white flex items-center text-blue-600 font-semibold hover:bg-gray-100 px-1"
                            >
                                My Bookings
                            </Link>
                        </>
                    ) : (
                        <Link
                            to={"signin"}
                            className="bg-white flex items-center text-blue-600 font-semibold hover:bg-gray-100 px-1"
                        >
                            Sign In
                        </Link>
                    )}
                </span>
            </div>
        </div>
    );
};

export default Header;
