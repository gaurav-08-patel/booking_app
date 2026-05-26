import { useFormContext } from "react-hook-form";

const ImagesSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-3">Images</h2>
            <div className="flex border p-3 border-dashed border-gray-300 max-sm:flex-col">
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    {...register("images", {
                        validate: (images) => {
                            let totalCount = images.length;

                            if (totalCount === 0) {
                                return "At least one image is required";
                            }
                            if (totalCount > 6) {
                                return "You can upload maximum of 6 images";
                            }

                            return true;
                        },
                    })}
                />
                {errors.images && (
                    <span className="text-red-500 font-semibold text-sm">
                        {errors.images.message}
                    </span>
                )}
            </div>
        </div>
    );
};

export default ImagesSection;
