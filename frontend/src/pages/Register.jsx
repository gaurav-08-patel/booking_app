import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toast";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Register = () => {
    let queryClient = useQueryClient();
    let navigate = useNavigate();
    const registerUser = async (formData) => {
        let response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/user/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include",
            },
        );
        let responseBody = await response.json();

        if (!response.ok) {
            throw new Error(responseBody.message);
        }

        return responseBody;
    };

    let mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            toast(data.message, {
                backgroundColor: "#00CF00",
                color: "white",
            });
            navigate("/");
            //invalidating my previous query to get new data(new status if user is logged in or not)
            queryClient.invalidateQueries(["validateToken"]);
        },
        onError: (error) => {
            toast(error.message, {
                backgroundColor: "#FF2C2C",
                color: "white",
            });
        },
    });

    let {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return (
        <div className=" flex flex-col gap-5 p-2">
            <h1 className="text-4xl font-semibold">Create an Account</h1>
            <form
                className="flex flex-col gap-2 mb-12"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex gap-2 max-md:flex-col">
                    <label className="font-semibold flex flex-col gap-1 flex-1">
                        First Name
                        <input
                            type="text"
                            {...register("firstName", {
                                required: "First name is required",
                            })}
                            className="font-normal border rounded px-3 py-2 focus:outline-none focus:ring-2"
                        />
                        {errors.firstName && (
                            <span className="text-red-500 font-semibold text-sm">
                                {errors.firstName.message}
                            </span>
                        )}
                    </label>
                    <label className="font-semibold flex flex-col gap-1 flex-1">
                        Last Name
                        <input
                            type="text"
                            {...register("lastName", {
                                required: "Last name is required",
                            })}
                            className="font-normal border rounded px-3 py-2 focus:outline-none focus:ring-2"
                        />
                        {errors.lastName && (
                            <span className="text-red-500 font-semibold text-sm">
                                {errors.lastName.message}
                            </span>
                        )}
                    </label>
                </div>

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
                        type="password"
                        {...register("password", {
                            minLength: {
                                value: 6,
                                message:
                                    "Password must be at least 6 characters",
                            },
                        })}
                        className="font-normal border rounded px-3 py-2 focus:outline-none focus:ring-2"
                    />
                    {errors.password && (
                        <span className="text-red-500 font-semibold text-sm">
                            {errors.password.message}
                        </span>
                    )}
                </label>
                <label className="font-semibold flex flex-col gap-1 flex-1">
                    Confirm Password
                    <input
                        type="password"
                        {...register("confirmPassword", {
                            validate: (value) => {
                                if (!value) {
                                    return "Confirm Password is required";
                                } else if (value !== watch("password")) {
                                    return "Passwords do not match";
                                }
                            },
                        })}
                        className="font-normal border rounded px-3 py-2 focus:outline-none focus:ring-2"
                    />
                    {errors.confirmPassword && (
                        <span className="text-red-500 font-semibold text-sm">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </label>

                <div className="flex justify-between">
                    <p className="text-slate-600">
                        Already have an account ?{" "}
                        <Link className="underline text-fuchsia-600">
                            Sign in
                        </Link>
                    </p>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white cursor-pointer"
                    >
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
