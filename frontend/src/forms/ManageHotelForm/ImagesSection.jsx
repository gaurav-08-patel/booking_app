import { useFormContext } from "react-hook-form";

const ImagesSection = () => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext();

    const existingImageUrls = watch("imageUrls") || [];

    function handleDeleteImage(url) {
        setValue(
            "imageUrls",
            existingImageUrls.filter((imageUrl) => imageUrl !== url),
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-3">Images</h2>
            <div className="flex border p-3 border-dashed border-gray-300 flex-col">
                {/* these images are for editHotel page , it will show the existing images */}
                {existingImageUrls?.length !== 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {existingImageUrls?.map((imageUrl, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={imageUrl}
                                    alt={`Image ${index}`}
                                    className="w-32 h-32 object-cover mr-3"
                                />
                                <button
                                    className="absolute top-0 right-3 bg-red-500 text-white px-2 py-1 opacity-0 max-sm:opacity-100 group-hover:opacity-100 cursor-pointer transition-opacity duration-300"
                                    type="button"
                                    onClick={() => handleDeleteImage(imageUrl)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex max-sm:flex-col">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        {...register("images", {
                            validate: (images) => {
                                let totalCount =
                                    images.length +
                                    (existingImageUrls?.length || 0);

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
        </div>
    );
};

export default ImagesSection;
