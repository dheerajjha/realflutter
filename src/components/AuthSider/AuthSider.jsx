"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { signUp } from "next-auth-sanity/client";
import { signIn, useSession, signOut } from "next-auth/react";
// import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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

  const loginHandler = async (type) => {
    try {
      const result = await signIn(type, {
        redirect: false, // prevent redirect
        email: formData.email,
        password: formData.password,
      });
      // router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("signup", formData);
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
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className={cn("text-[16px] px-[32px] py-[10px] ")}
          variant={text === "Login" ? "ghost" : "gradient"}
          style={{
            color: text === "Login" ? "#383638" : "#ffffff",
          }}
        >
          {text}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-[500px] bg-[#122030] border-l-0">
        <div className="flex items-center justify-center flex-col w-full gap-8 mt-20 z-10">
          <Image
            src="/assets/logo-white-text.png"
            alt="logo"
            width={130}
            height={80}
          />
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
              {openSignup && (
                <input
                  className={inputStyles}
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              )}
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

              {!openSignup && (
                <p className="text-blueHeading text-right">Forgot password?</p>
              )}
            </div>

            {openSignup ? (
              <Button
                variant="gradient"
                className="w-full max-w-sm p-[12px]"
                type="submit"
              >
                Sign Up
              </Button>
            ) : (
              <Button
                variant="gradient"
                className="w-full max-w-sm p-[12px]"
                onClick={() => loginHandler("sanity-login")}
              >
                Login
              </Button>
            )}
          </form>
          {!openSignup && (
            <div className="text-white flex items-center justify-between gap-5">
              <div className="p-[2px] rounded-md w-[150px] text-[#ffffff66] text-[16px] bg-[#1A2B3A] border-none focus:outline-none bg-[linear-gradient(270deg,_rgba(255,_255,_255,_0.1)_0%,_rgba(255,_255,_255,_0.25)_50.3%,_rgba(255,_255,_255,_0.1)_100%)]"></div>
              <span className="whitespace-nowrap">or login with</span>
              <div className="p-[2px] rounded-md w-[150px] text-[#ffffff66] text-[16px] bg-[#1A2B3A] border-none focus:outline-none bg-[linear-gradient(270deg,_rgba(255,_255,_255,_0.1)_0%,_rgba(255,_255,_255,_0.25)_50.3%,_rgba(255,_255,_255,_0.1)_100%)]"></div>
            </div>
          )}

          {!openSignup && (
            <div className="flex items-center gap-10 justify-center text-white">
              <Button
                onClick={() => loginHandler("google")}
                variant="text"
                type="submit"
                name="action"
                value="google"
              >
                <Image
                  src="/assets/google.svg"
                  alt="google"
                  width={24}
                  height={24}
                />
              </Button>

              <Button
                onClick={() => loginHandler("github")}
                variant="text"
                type="submit"
                name="action"
                value="github"
              >
                <Image
                  src="/assets/github.svg"
                  alt="github"
                  width={30}
                  height={30}
                />
              </Button>
            </div>
          )}

          <div className="text-white flex items-center gap-3">
            {openSignup ? "Already have an account?" : "Don't have an account?"}
            {openSignup ? (
              <div
                variant="text"
                className="text-blueHeading cursor-pointer"
                onClick={() => setOpenSignup(!openSignup)}
              >
                Login
              </div>
            ) : (
              <div
                variant="text"
                className="text-blueHeading cursor-pointer"
                onClick={() => setOpenSignup(!openSignup)}
              >
                Sign Up
              </div>
            )}
          </div>
        </div>
        <Image
          src="/assets/leaf.png"
          alt="leaf"
          width={150}
          height={150}
          className="absolute hidden lg:flex top-[3%] right-[3%]  z-0"
        />
        <Image
          src="/assets/leaf.png"
          alt="leaf"
          width={150}
          height={150}
          className="absolute hidden lg:flex bottom-[3%] left-[3%] transform rotate-90 z-0"
        />
      </SheetContent>
    </Sheet>
  );
};

export default AuthSider;
