import { useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useQuery } from "@tanstack/react-query";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import SearchFilters from "../components/SearchFilters";

const SearchPage = () => {
    const search = useSearchContext();
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        selectedStars: [],
        selectedHotelsType: [],
        selectedFacilities: [],
        maxPrice: null,
    });
    const [sortOption, setSortOprtion] = useState(null);

    //to make sure the page is reset when the search is changed
    useEffect(() => setPage(1), [search]);
    // console.log(search);
    const searchParams = new URLSearchParams();
    searchParams.append("destination", search.destination || "");
    searchParams.append("checkIn", search.checkIn.toISOString() || "");
    searchParams.append("checkOut", search.checkOut.toISOString() || "");
    searchParams.append("adultCount", search.adultCount.toString() || "");
    searchParams.append("childCount", search.childCount.toString() || "");
    searchParams.append("page", page.toString() || "");

    if (filters.selectedStars.length > 0) {
        filters.selectedStars.forEach((star) => {
            searchParams.append("starRating", star);
        });
    }

    if (filters.selectedHotelsType.length > 0) {
        filters.selectedHotelsType.forEach((type) => {
            searchParams.append("type", type);
        });
    }

    if (filters.selectedFacilities.length > 0) {
        filters.selectedFacilities.forEach((facility) => {
            searchParams.append("facilities", facility);
        });
    }

    if (filters.maxPrice) {
        searchParams.append("maxPrice", filters.maxPrice);
    }

    if (sortOption) {
        searchParams.append("sortOption", sortOption);
    }

    async function searchHotels(searchParams) {
        let response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/hotel/search?${searchParams}`,
        );
        let responseBody = await response.json();
        if (!response.ok) throw new Error(responseBody.message);
        return responseBody;
    }

    const { data, isLoading } = useQuery({
        queryKey: ["searchHotels", search, page, filters, sortOption],
        queryFn: () => searchHotels(searchParams),
    });

    return (
        <div className="grid grid-cols-[250px_1fr] max-md:grid-cols-1 gap-5 p-2 ">
            <SearchFilters filters={filters} setFilters={setFilters} />
            <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center mb-3 border-b border-slate-300 pb-1">
                    <div className="text-lg font-bold ">
                        {data?.pagination.totalHotels} hotels found{" "}
                        {search.destination ? `in ${search.destination}` : ""}
                    </div>
                    <select
                        onChange={(e) => setSortOprtion(e.target.value)}
                        className="font-normal border border-gray-400 rounded px-3 py-1.5 focus:outline-none focus:ring-1"
                    >
                        <option value="">Sort By</option>
                        <option value="starRating">Star Rating</option>
                        <option value="priceLowToHigh">
                            Price Per Night(low to high)
                        </option>
                        <option value="priceHighToLow">
                            Price Per Night(high to low)
                        </option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    {isLoading ? (
                        <div className="text-center">Loading...</div>
                    ) : (
                        data?.hotels.map((hotel) => (
                            <SearchResultsCard hotel={hotel} key={hotel._id} />
                        ))
                    )}
                </div>
                <div className="flex justify-center mt-auto">
                    <Pagination
                        page={data?.pagination.currentPage || 1}
                        pages={data?.pagination.totalPages || 1}
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
