import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypesSection from "./TypesSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

const ManageHotelForm = () => {
    const formMethods = useForm();

    const onSubmit = (data) => {
        console.log(data);
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
                <ImagesSection/>
                <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </FormProvider>
    );
};

export default ManageHotelForm;
