import { hotelFacilities, hotelTypes } from "../config/hotel-options-config";


const SearchFilters = ({filters,setFilters}) => {
    return (
        <div className="border border-slate-300 p-4 rounded sticky top-10 h-fit space-y-5">
            <h1 className="text-lg font-semibold mb-3 border-b border-slate-300 pb-1">
                Filter By :
            </h1>
            <div className="border-b border-slate-300 pb-3">
                <h1 className="font-semibold mb-2">Property Rating</h1>
                <div className="flex flex-col">
                    {["1", "2", "3", "4", "5"].map((rating) => (
                        <label
                            key={rating}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                value={rating}
                                checked={filters.selectedStars.includes(rating)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setFilters((prev) => ({
                                            ...prev,
                                            selectedStars: [
                                                ...prev.selectedStars,
                                                rating,
                                            ],
                                        }));
                                    } else {
                                        setFilters((prev) => ({
                                            ...prev,
                                            selectedStars:
                                                prev.selectedStars.filter(
                                                    (star) => star !== rating,
                                                ),
                                        }));
                                    }
                                }}
                            />
                            <span>
                                {rating} {rating > 1 ? "stars" : "star"}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
            <div className="border-b border-slate-300 pb-3">
                <h1 className="font-semibold mb-2">Hotel Type</h1>
                <div className="flex flex-col">
                    {hotelTypes.map((type) => (
                        <label
                            key={type}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                value={type}
                                checked={filters.selectedHotelsType.includes(
                                    type,
                                )}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setFilters((prev) => ({
                                            ...prev,
                                            selectedHotelsType: [
                                                ...prev.selectedHotelsType,
                                                type,
                                            ],
                                        }));
                                    } else {
                                        setFilters((prev) => ({
                                            ...prev,
                                            selectedHotelsType:
                                                prev.selectedHotelsType.filter(
                                                    (t) => t !== type,
                                                ),
                                        }));
                                    }
                                }}
                            />
                            <span>{type}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className="border-b border-slate-300 pb-3">
                <h1 className="font-semibold mb-2">Facilities</h1>
                <div className="flex flex-col">
                    {hotelFacilities.map((facility) => (
                        <label
                            key={facility}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                value={facility}
                                checked={filters.selectedFacilities.includes(
                                    facility,
                                )}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setFilters((prev) => ({
                                            ...prev,
                                            selectedFacilities: [
                                                ...prev.selectedFacilities,
                                                facility,
                                            ],
                                        }));
                                    } else {
                                        setFilters((prev) => ({
                                            ...prev,
                                            selectedFacilities:
                                                prev.selectedFacilities.filter(
                                                    (t) => t !== facility,
                                                ),
                                        }));
                                    }
                                }}
                            />
                            <span>{facility}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <h1 className="font-semibold mb-2">Max Price</h1>
                <select
                    onChange={(e) => {
                        setFilters((prev) => ({
                            ...prev,
                            maxPrice: e.target.value,
                        }));
                    }}
                    className="font-normal border border-gray-400 rounded px-3 py-1.5 focus:outline-none focus:ring-1 w-full"
                >
                    <option value="">Select Max Price(null)</option>
                    {[50, 100, 200, 300, 400, 500].map((price) => (
                        <option value={price} key={price}>
                            {price}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SearchFilters;
