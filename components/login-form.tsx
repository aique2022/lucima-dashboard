"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Eye, EyeOff, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Image from "next/image";
import Logo from "@/app/assets/icon/logo.svg";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState(false);
  const router = useRouter(); // Create a router instance to navigate

  // Default admin credentials
  const defaultAdminCredentials = {
    email: "lucima@qube.com", // Replace with the admin's email
    password: "pandoralucimaadmin2025", // Replace with the admin's password
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if the entered credentials match the default admin credentials
    if (
      data.email === defaultAdminCredentials.email &&
      data.password === defaultAdminCredentials.password
    ) {
      router.push("/dashboard");
    } else {
      setError(true);
      console.log("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-transparent">
      <div className="w-full max-w-[440px] bg-white p-8 rounded-xl shadow-lg dark:bg-transparent dark:border">
        <div className="space-y-2 text-center">
          <Image src={Logo} alt="lucima logo" className="h-[50px] w-[150px]" />

          <h1 className="text-3xl font-bold text-gray-900"></h1>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">
            Oops! Invalid Credentials
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoComplete="email"
                {...register("email")}
                className={cn(
                  "pl-10 border rounded-lg",
                  errors.email && "border-red-500 focus:ring-red-500"
                )}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...register("password")}
                className={cn(
                  "pr-10 border rounded-lg",
                  errors.password && "border-red-500 focus:ring-red-500"
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" {...register("rememberMe")} />
              <Label htmlFor="remember" className="text-gray-600">
                Remember me
              </Label>
            </div>
            {/* <Link
              href="/forgot-password"
              className="text-purple-600 hover:text-purple-500"
            >
              Forgot Password?
            </Link> */}
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-gray-400 text-center mt-5">Pandora dashboard 2025</p>
      </div>
    </div>
  );
}
