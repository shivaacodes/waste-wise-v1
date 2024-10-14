"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await res.json();
    if (res.ok) {
      setSuccess(true);
      console.log("Registration successful");
    } else {
      setError(data.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-1/2 max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Register
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                required
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <Label className="text-sm font-medium">Role</Label>
              <Select value={role} onValueChange={(value) => setRole(value)}>
                <SelectTrigger className="w-full mt-1">
                  {role === "customer" ? "Customer" : "Worker"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Resident</SelectItem>
                  <SelectItem value="worker">Worker</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm mt-2">
                Registration successful!
              </p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <Button type="submit" className="w-full">
              Register
            </Button>
            <p className="mt-4 text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/signin" className="text-blue-500 hover:underline">
                Signin
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
