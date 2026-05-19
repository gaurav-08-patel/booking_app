import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toast";

const Header = () => {
    let { isLoggedIn } = useAppContext();
    let queryClient = useQueryClient();

    const handleSignOut = async () => {
        let response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
            {
                method: "POST",
                credentials: "include",
            },
        );

        if (!response.ok) throw new Error(response.message);
        return;
    };

    let mutation = useMutation({
        mutationFn: handleSignOut,
        onSuccess: () => {
            toast("You are signed out", { backgroundColor: "#00CF00" });
            queryClient.invalidateQueries(["validateToken"]);
        },
    });

    return (
        <div className="bg-blue-800 py-6 p-1">
            <div className="container mx-auto flex justify-between ">
                <Link className="text-2xl text-white font-bold tracking-tight">
                    Mernholidays.com
                </Link>

                <span className="flex space-x-2">
                    {isLoggedIn ? (
                        <>
                            <Link className="bg-white flex items-center text-blue-600 font-semibold hover:bg-gray-100 px-1">
                                My Hotels
                            </Link>
                            <Link className="bg-white flex items-center text-blue-600 font-semibold hover:bg-gray-100 px-1">
                                My Bookings
                            </Link>
                            <button
                                className="bg-white flex items-center text-blue-600 font-semibold hover:bg-gray-100 px-1 cursor-pointer"
                                onClick={() => {
                                    mutation.mutate();
                                }}
                            >
                                Sign Out
                            </button>
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
