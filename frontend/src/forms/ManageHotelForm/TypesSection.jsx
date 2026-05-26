import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";

const TypesSection = () => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext();
    const typeWatch = watch("type");

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-3">Types</h1>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
                {hotelTypes.map((type) => (
                    <label
                        className={`${typeWatch === type ? "bg-blue-300" : "bg-gray-300"} cursor-pointer flex items-center rounded-full px-4 py-2`}
                    >
                        <input
                            type="radio"
                            value={type}
                            {...register("type", {
                                required: "Type is required",
                            })}
                            className="hidden"
                        />
                        {type}
                    </label>
                ))}
            </div>

            {errors.type && (
                <span className="text-red-500 font-semibold text-sm">
                    {errors.type.message}
                </span>
            )}

        </div>
    );
};

export default TypesSection;
