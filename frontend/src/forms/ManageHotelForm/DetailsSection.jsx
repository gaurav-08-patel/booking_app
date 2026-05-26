import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-bold">Add Hotel</h1>
            <div className="flex flex-col gap-3">
                <label className="font-semibold flex flex-col gap-0.5 flex-1">
                    Name
                    <input
                        type="text"
                        {...register("name", {
                            required: "Hotel name is required",
                        })}
                        className="font-normal border border-gray-400 rounded px-3 py-1.5 focus:outline-none focus:ring-2"
                    />
                    {errors.name && (
                        <span className="text-red-500 font-semibold text-sm">
                            {errors.name.message}
                        </span>
                    )}
                </label>
                <div className="flex gap-2 max-md:flex-col">
                    <label className="font-semibold flex flex-col gap-1 flex-1">
                        City
                        <input
                            type="text"
                            {...register("city", {
                                required: "City name is required",
                            })}
                            className="font-normal border border-gray-400 rounded px-3 py-1.5 focus:outline-none focus:ring-2"
                        />
                        {errors.city && (
                            <span className="text-red-500 font-semibold text-sm">
                                {errors.city.message}
                            </span>
                        )}
                    </label>
                    <label className="font-semibold flex flex-col gap-1 flex-1">
                        Country
                        <input
                            type="text"
                            {...register("country", {
                                required: "Country is required",
                            })}
                            className="font-normal border border-gray-400 rounded px-3 py-1.5 focus:outline-none focus:ring-2"
                        />
                        {errors.country && (
                            <span className="text-red-500 font-semibold text-sm">
                                {errors.country.message}
                            </span>
                        )}
                    </label>
                </div>
                <label className="font-semibold flex flex-col gap-1 flex-1">
                    Description
                    <textarea
                        rows="8"
                        {...register("description", {
                            required: "Description is required",
                        })}
                        className="font-normal border border-gray-400 rounded px-3 py-1.5 focus:outline-none focus:ring-2 resize-none"
                    />
                    {errors.description && (
                        <span className="text-red-500 font-semibold text-sm">
                            {errors.description.message}
                        </span>
                    )}
                </label>
                <label className="font-semibold flex flex-col gap-1 max-w-1/2">
                    Price Per Night
                    <input
                        type="number"
                        min="0"
                        {...register("pricePerNight", {
                            required: "Price is required",
                        })}
                        className="font-normal border border-gray-400 rounded px-3 py-1.5 focus:outline-none focus:ring-2 resize-none"
                    />
                    {errors.pricePerNight && (
                        <span className="text-red-500 font-semibold text-sm">
                            {errors.pricePerNight.message}
                        </span>
                    )}
                </label>
                <label className="font-semibold flex flex-col gap-1 max-w-1/2">
                    Star rating
                    <select
                        {...register("starRating", {
                            required: "Star rating is required",
                        })}
                        className="font-normal border border-gray-400 rounded px-3 py-1.5 focus:outline-none focus:ring-2"
                    >
                        <option value="">Select Star Rating</option>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <option key={star} value={star}>
                                {star} Star
                            </option>
                        ))}
                    </select>
                    {errors.starRating && (
                        <span className="text-red-500 font-semibold text-sm">
                            {errors.starRating.message}
                        </span>
                    )}
                </label>
            </div>
        </div>
    );
};

export default DetailsSection;
