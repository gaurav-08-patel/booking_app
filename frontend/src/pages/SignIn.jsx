import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className=" flex flex-col gap-5 p-2 mx-auto max-w-md">
            <h1 className="text-4xl font-semibold">SignIn</h1>
            <form
                className="flex flex-col gap-2 mb-12"
                onSubmit={handleSubmit(onSubmit)}
            >
                <label className="font-semibold flex flex-col gap-1 flex-1">
                    Email
                    <input
                        type="text"
                        {...register("email", {
                            required: "Email is required",
                        })}
                        className="font-normal border rounded px-3 py-2 focus:outline-none focus:ring-2"
                    />
                    {errors.email && (
                        <span className="text-red-500 font-semibold text-sm">
                            {errors.email.message}
                        </span>
                    )}
                </label>
                <label className="font-semibold flex flex-col gap-1 flex-1">
                    Password
                    <input
                        type="text"
                        {...register("password", {
                            required: "Password is required",
                        })}
                        className="font-normal border rounded px-3 py-2 focus:outline-none focus:ring-2"
                    />
                    {errors.password && (
                        <span className="text-red-500 font-semibold text-sm">
                            {errors.password.message}
                        </span>
                    )}
                </label>
                <div className="flex justify-between">
                    <p className="text-slate-600">
                        Don't have an account ?{" "}
                        <Link
                            to="/register"
                            className="underline text-fuchsia-600"
                        >
                            Register here
                        </Link>
                    </p>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white cursor-pointer"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
