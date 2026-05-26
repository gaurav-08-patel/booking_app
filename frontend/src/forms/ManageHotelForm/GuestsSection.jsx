import { useFormContext } from "react-hook-form";

const GuestSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-3">Guests</h2>
            <div className="flex gap-2 max-md:flex-col bg-gray-300 p-4">
                <label className="font-semibold flex flex-col gap-1 flex-1">
                    Adults Count
                    <input
                        type="number"
                        min={1}
                        {...register("adultCount", {
                            required: "Adult count is required",
                        })}
                        className="font-normal border border-gray-400 rounded px-3 py-1.5 focus:outline-none focus:ring-2"
                    />
                    {errors.adultCount && (
                        <span className="text-red-500 font-semibold text-sm">
                            {errors.adultCount.message}
                        </span>
                    )}
                </label>
                <label className="font-semibold flex flex-col gap-1 flex-1">
                    Childrens Count
                    <input
                        type="number"
                        min={0}
                        {...register("childCount", {
                            required: "Children Count is required",
                        })}
                        className="font-normal border border-gray-400 rounded px-3 py-1.5 focus:outline-none focus:ring-2"
                    />
                    {errors.childCount && (
                        <span className="text-red-500 font-semibold text-sm">
                            {errors.childCount.message}
                        </span>
                    )}
                </label>
            </div>
        </div>
    );
};

export default GuestSection;
