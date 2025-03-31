import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as z from "zod";
import { useState } from "react";

interface LoginFormValues {
  uid: string;
  password: string;
}

const loginSchema = z.object({
  uid: z.string().nonempty("UID is required"),
  password: z.string().nonempty("Password is required"),
});

export default function Login() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      return axios.post("/api/login", data);
    },
    onSuccess: (response) => {
      console.log("Login successful:", response.data);
      setServerError(null);
      // Redirect or store token here
    },
    onError: (error: any) => {
      setServerError(error.response?.data?.message || "Login failed. Please try again.");
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setServerError(null);
    loginMutation.mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-center text-2xl font-semibold mb-4">Welcome back!</h2>
        {serverError && <p className="text-red-500 text-sm text-center mb-2">{serverError}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="UID"
              {...register("uid")}
              className="w-full p-2 border rounded"
            />
            {errors.uid && <p className="text-red-500 text-sm">{errors.uid.message}</p>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full p-2 border rounded"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loginMutation.status === 'pending'}
            className={`w-full text-white p-2 rounded ${
              loginMutation.status === 'pending' ? "bg-gray-500 cursor-not-allowed" : "bg-blue-900 hover:bg-blue-800"
            }`}
          >
            {loginMutation.status === 'pending' ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
