import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Define validation schema
const loginSchema = z.object({
  uid: z.string().min(1, "UID is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      return axios.post("/api/login", data);
    },
    onSuccess: () => {
      alert("Login successful!");
    },
    onError: () => {
      alert("Login failed. Please check your credentials.");
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-center text-2xl font-semibold mb-4">Welcome back!</h2>
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
            className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
