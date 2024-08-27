"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signIn, useSession, signOut } from "next-auth/react";
import { Separator } from "../ui/separator";
import { SendHorizontal } from "lucide-react";
import AuthSider from "../AuthSider/AuthSider";
import { fetchCategoryWithSubCategories } from "@/lib/apis";

const Navbar = () => {
  const { data } = useSession();
  const [active, setActive] = useState("signup");
  return (
    <header className="bg-background h-[80px] lg:h-[70px] w-full flex items-center justify-center">
      <nav className="max-w-6xl w-full h-full flex items-end lg:items-center justify-between px-3 md:px-5 pb-3 lg:pb-0 lg:px-0">
        <Link href="/">
          <Image src="/assets/logo.png" alt="logo" width={160} height={60} />
        </Link>
        {data ? (
          <Button
            variant="gradient"
            onClick={signOut}
            className="hidden md:block"
          >
            Logout
          </Button>
        ) : (
          <div className="hidden md:flex items-center gap-5 ">
            <AuthSider active={active} setActive={setActive} text="Login" />
            <AuthSider active={active} setActive={setActive} text="Signup" />
          </div>
        )}

        <div className="flex md:hidden">
          <MobileNavbar data={data} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

const MobileNavbar = ({ data }) => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    (async () => {
      let data = await fetchCategoryWithSubCategories();
      data.sort((a, b) => a.order - b.order);
      setCategory(data);
    })();
  }, []);
  // console.log("sidebar", category);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image src="/assets/openMenu.svg" alt="logo" width={30} height={30} />
      </SheetTrigger>
      <SheetContent>
        <div className="mt-20">
          {data ? (
            <Button
              variant="gradient"
              onClick={signOut}
              className="lg:hidden w-fit"
            >
              Logout
            </Button>
          ) : (
            <div className="lg:hidden items-center gap-5 ">
              <div className="space-y-3 flex flex-col">
                <Link
                  href="/auth/login"
                  className="text-[#62A5DA] text-[16px] font-semibold"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="text-[#62A5DA] text-[16px] font-semibold"
                >
                  Signup
                </Link>
              </div>
            </div>
          )}
          <Separator className="my-3" />
          <div className="space-y-3">
            <p className="text-gray-400 text-[14px] font-medium flex items-center justify-between w-full">
              Categories
            </p>
            {category.map((item, index) => {
              if (item?.subCategories?.length <= 0) return null;
              return (
                <Link
                  href={`#${item.order}`}
                  key={index}
                  className="text-heading text-[16px] font-semibold flex items-center justify-between w-full"
                >
                  {item.name}
                  <SendHorizontal size={18} className="text-heading" />
                </Link>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
