import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";

const FacilitiesSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-3">Facilities</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
                {hotelFacilities.map((facility) => (
                    <label
                        className=" cursor-pointer flex items-center gap-2 break-word-no-wrap "
                        key={facility}
                    >
                        <input
                            type="checkbox"
                            value={facility}
                            {...register("facilities", {
                                required: "At least one facility is required",
                            })}
                        />
                        {facility}
                    </label>
                ))}
            </div>
            {errors.facilities && (
                <span className="text-red-500 font-semibold text-sm">
                    {errors.facilities.message}
                </span>
            )}
        </div>
    );
};

export default FacilitiesSection;
