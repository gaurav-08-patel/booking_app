import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="bg-blue-800 py-6 p-1">
            <div className="container mx-auto flex justify-between ">
                <Link className="text-2xl text-white font-bold tracking-tight">
                    Mernholidays.com
                </Link>

                <span className="flex space-x-4  ">
                    <span className=" hover:underline cursor-pointer flex items-center text-white font-semibold">
                        Privacy Policy
                    </span>
                    <span className="flex items-center text-white font-semibold hover:underline cursor-pointer ">
                        Terms of Service
                    </span>
                    
                </span>
            </div>
        </div>
    );
};

export default Footer;
