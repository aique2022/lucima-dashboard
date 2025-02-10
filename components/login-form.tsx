"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState(false);
  const router = useRouter();

  // Default admin credentials
  const defaultAdminCredentials = {
    email: "lucima@qube.com",
    password: "pandoralucimaadmin2025",
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md min-w-[528px] bg-white rounded-3xl shadow-sm p-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Login to your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="username"
                placeholder="Username"
                type="text"
                {...register("email")}
                className={cn(
                  "pl-10",
                  errors.email && "border-red-500 focus-visible:ring-red-500"
                )}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">Invalid username</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...register("password")}
                className={cn(
                  "pl-10 border rounded-lg",
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

          {error && (
            <p className="text-sm text-red-500 text-center">
              Oops! Invalid Credentials
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#00C290] via-[#0FB8AA] to-[#1FADC5] hover:opacity-90 transition-opacity"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link
            href="/privacy"
            className="text-muted-foreground hover:underline"
          >
            Privacy policy
          </Link>
          <span className="text-muted-foreground mx-2">•</span>
          <Link href="/terms" className="text-muted-foreground hover:underline">
            Terms of use
          </Link>
        </div>
      </div>
    </div>
  );
}
