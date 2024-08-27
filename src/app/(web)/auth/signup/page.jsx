"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { GithubIcon, Link, LinkedinIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { signUp } from "next-auth-sanity/client";
import { signIn, useSession, signOut } from "next-auth/react";
// import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";

const defaultFormData = {
  email: "",
  name: "",
  password: "",
};

const AuthSider = ({ active, setActive, text }) => {
  const [openSignup, setOpenSignup] = useState(
    text === "Signup" ? true : false
  );
  const [formData, setFormData] = useState(defaultFormData);

  const inputStyles =
    "p-[8px] rounded-full pl-3 text-[#ffffff66] w-full text-[16px] bg-[#1A2B3A] border-none focus:outline-none bg-[linear-gradient(270deg,_rgba(255,_255,_255,_0.1)_0%,_rgba(255,_255,_255,_0.25)_50.3%,_rgba(255,_255,_255,_0.1)_100%)]";

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/");
  }, [router, session]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await signUp(formData);
      if (user) {
        console.log("Success. please sign in");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFormData(defaultFormData);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col bg-[#122030]">
      <div className="flex items-center justify-center flex-col w-full gap-8">
        <Image src="/assets/logo.svg" alt="logo" width={100} height={60} />
        <p className="text-white font-medium text-[16px] lg:text-[25px] max-w-5xl text-center">
          Log in to your <span className="text-[#62A5DA]">Real Flutter</span>{" "}
          <br />
          Account
        </p>
        <form
          className="flex items-center justify-center flex-col w-full gap-8"
          onSubmit={handleSubmit}
        >
          <div className="max-w-sm mx-auto space-y-3">
            <input
              className={inputStyles}
              type="text"
              name="name"
              placeholder="John Doe"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              className={inputStyles}
              type="email"
              name="email"
              placeholder="name@company.com"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              className={inputStyles}
              type="password"
              name="password"
              placeholder="password"
              required
              minLength={6}
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          {openSignup && (
            <Button
              variant="gradient"
              className="w-full max-w-sm p-[12px]"
              type="submit"
            >
              Sign Up
            </Button>
          )}
        </form>

        <div className="text-white flex items-center gap-2">
          Already have an account?
          <Button
            className="text-blueHeading cursor-pointer text-lg"
            onClick={() => router.push("/auth/login")}
            variant="text"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthSider;
