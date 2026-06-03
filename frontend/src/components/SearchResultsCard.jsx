import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const SearchResultsCard = ({ hotel }) => {
    return (
        <div className="border border-slate-300 p-4 rounded grid grid-cols-[2fr_3fr] max-lg:grid-cols-1 gap-3">
            <div className="w-full h-75 ">
                <img
                    src={hotel.imageUrls[0]}
                    className="w-full h-full object-cover object-center"
                />
            </div>
            <div className="grid grid-rows-[1fr_2fr_1fr]">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="flex ">
                            {Array.from({ length: hotel.starRating }).map(
                                (_, key) => (
                                    <AiFillStar
                                        key={key}
                                        className="fill-yellow-400"
                                    />
                                ),
                            )}
                        </span>
                        <span className="text-sm text-gray-500">
                            {hotel.type}
                        </span>
                    </div>
                    <Link to={`/detail/${hotel._id}`} className="text-2xl font-bold ">{hotel.name}</Link>
                </div>
                <div>
                    <p className="line-clamp-5">{hotel.description}</p>
                </div>
                <div className=" grid grid-cols-2 items-end whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="flex gap-0.5">
                            {hotel.facilities
                                .slice(0, 3)
                                .map((facility, key) => (
                                    <span
                                        key={key}
                                        className="bg-slate-300 p-1 text-sm rounded-lg tex-sm"
                                    >
                                        {facility}
                                    </span>
                                ))}
                        </div>
                        <span className="text-sm">
                            {hotel.facilities.length > 3 &&
                                `+${hotel.facilities.length - 3} more`}
                        </span>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-center">
                            <span className="font-semibold">
                                ${hotel.pricePerNight}
                            </span>
                            <span className="text-sm">/night</span>
                        </div>
                        <Link to={`/detail/${hotel._id}`} className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 w-fit">
                            Reserve
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultsCard;
