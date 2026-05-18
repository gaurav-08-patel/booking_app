import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toast";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    let navigate = useNavigate();
    let queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const loginUser = async (data) => {
        let response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            },
        );

        let responseBody = await response.json();
        if (!response.ok) {
            throw new Error(responseBody.message);
        }

        return responseBody;
    };

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: async (data) => {
            toast(data.message, {
                backgroundColor: "#00CF00",
                color: "white",
            });
            await queryClient.refetchQueries(["validateToken"]);
            navigate("/");
        },
        onError: (error) => {
            toast(error.message, {
                backgroundColor: "#FF2C2C",
                color: "white",
            });
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
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
                        type="password"
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
