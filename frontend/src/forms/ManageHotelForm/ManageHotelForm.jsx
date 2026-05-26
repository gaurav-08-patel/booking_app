import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypesSection from "./TypesSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

const ManageHotelForm = ({ onSave, isLoading }) => {
    const formMethods = useForm();


    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("city", data.city);
        formData.append("country", data.country);
        formData.append("description", data.description);
        formData.append("pricePerNight", data.pricePerNight);
        formData.append("starRating", data.starRating);
        formData.append("type", data.type);
        formData.append("adultCount", data.adultCount);
        formData.append("childCount", data.childCount);
        
        data.facilities.forEach((facility) => {
            formData.append("facilities", facility);
        });
        
        Array.from(data.images).forEach((image) => {
            formData.append("images", image);
        });
        
        
        console.log(formData);
        onSave(formData);
    };

    return (
        <FormProvider {...formMethods}>
            <form
                className="max-w-4xl mx-auto p-2 flex flex-col gap-8"
                onSubmit={formMethods.handleSubmit(onSubmit)}
            >
                <DetailsSection />
                <TypesSection />
                <FacilitiesSection />
                <GuestSection />
                <ImagesSection />
                <button
                    disabled={isLoading}
                    type="submit"
                    className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded cursor-pointer hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed`}
                >
                    {isLoading ? "Saving..." : "Save"}
                </button>
            </form>
        </FormProvider>
    );
};

export default ManageHotelForm;
