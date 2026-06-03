import { useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useQuery } from "@tanstack/react-query";
import SearchResultsCard from "../components/SearchResultsCard";

const SearchPage = () => {
    const search = useSearchContext();
    const [page, setPage] = useState(1);
    // console.log(search);
    const searchParams = new URLSearchParams();
    searchParams.append("destination", search.destination || "");
    searchParams.append("checkIn", search.checkIn.toISOString() || "");
    searchParams.append("checkOut", search.checkOut.toISOString() || "");
    searchParams.append("adultCount", search.adultCount.toString() || "");
    searchParams.append("childCount", search.childCount.toString() || "");
    searchParams.append("page", page.toString() || "");

    async function searchHotels(searchParams) {
        let response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/hotel/search?${searchParams}`,
        );
        let responseBody = await response.json();
        if (!response.ok) throw new Error(responseBody.message);
        return responseBody;
    }

    const { data } = useQuery({
        queryKey: ["searchHotels", searchParams],
        queryFn: () => searchHotels(searchParams),
    });
    console.log(data);

    return (
        <div className="grid grid-cols-[250px_1fr] max-md:grid-cols-1 gap-5 p-2 ">
            <div className="border border-slate-300 p-4 rounded sticky top-10  h-fit">
                <h1 className="text-lg font-semibold mb-3 border-b border-slate-300 pb-1">Filter By :</h1>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center mb-3 border-b border-slate-300 pb-1">
                    <div className="text-lg font-bold ">{data?.pagination.totalHotels} hotels found {search.destination ? `in ${search.destination}` : ""  }</div>
                </div>
                <div className="flex flex-col gap-2">
                    {data?.hotels.map((hotel) => (
                        <SearchResultsCard hotel={hotel} key={hotel._id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
