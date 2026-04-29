"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import MicrosoftIcon from "./microosoft-icon";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    console.log("[v0] Form submitted:", { email, rememberMe });
  };

  const handleMicrosoftLogin = () => {
    console.log("[v0] Microsoft OAuth initiated");
    // Microsoft OAuth would be implemented here
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-card-foreground">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          {/* Microsoft OAuth Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 gap-3 text-card-foreground hover:bg-secondary"
            onClick={handleMicrosoftLogin}
          >
            <MicrosoftIcon className="h-5 w-5" />
            Continue with Microsoft
          </Button>

          {/* Separator */}
          <div className="my-6">
            <FieldSeparator>or</FieldSeparator>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </Field>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked === true)
                    }
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-foreground hover:underline underline-offset-4"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </FieldGroup>
          </form>

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <a
              href="#"
              className="text-foreground font-medium hover:underline underline-offset-4"
            >
              Sign up
            </a>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <a href="#" className="hover:underline underline-offset-4">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="hover:underline underline-offset-4">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
