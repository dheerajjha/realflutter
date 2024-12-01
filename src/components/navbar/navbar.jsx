"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signIn, useSession, signOut } from "next-auth/react";
import { Separator } from "../ui/separator";
import { SendHorizontal, ChevronDown } from "lucide-react";
import AuthSider from "../AuthSider/AuthSider";
import { fetchCategoryWithSubCategories } from "@/lib/apis";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { SessionProvider } from "next-auth/react";

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
          <div className="hidden md:flex items-center gap-4">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="flex items-center gap-2 text-heading hover:text-[#62A5DA] transition-colors outline-none">
                <span>Hi, {data.user?.name} 👋</span>
                <ChevronDown size={20} />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content 
                  align="end" 
                  className="w-[200px] p-2 bg-white rounded-lg shadow-lg border border-gray-100 mt-2"
                >
                  <DropdownMenu.Item className="outline-none">
                    <Link 
                      href="/templates" 
                      className="flex items-center gap-2 w-full p-2 text-heading hover:text-[#62A5DA] transition-colors rounded-md"
                    >
                      <Image src="/assets/template.svg" alt="templates" width={20} height={20} />
                      <span>Templates</span>
                    </Link>
                  </DropdownMenu.Item>
                  <Separator className="my-2" />
                  <DropdownMenu.Item className="outline-none">
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-2 w-full p-2 text-red-500 hover:text-red-600 transition-colors rounded-md"
                    >
                      <Image src="/assets/logout.svg" alt="logout" width={20} height={20} />
                      <span>Logout</span>
                    </button>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-5">
            <AuthSider active={active} setActive={setActive} text="Login" />
            <AuthSider active={active} setActive={setActive} text="Sign Up" />
          </div>
        )}

        <div className="flex md:hidden">
          <MobileNavbar data={data} />
        </div>
      </nav>
    </header>
  );
};

const MobileNavbar = ({ data }) => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    (async () => {
      let data = await fetchCategoryWithSubCategories();
      data.sort((a, b) => a.order - b.order);
      setCategory(data);
    })();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image src="/assets/openMenu.svg" alt="logo" width={30} height={30} />
      </SheetTrigger>
      <SheetContent>
        <div className="mt-20">
          {data ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-heading text-lg">Hi, {data.user?.name} 👋</span>
              </div>
              <Link
                href="/templates"
                className="text-heading text-[16px] font-semibold flex items-center gap-2 hover:text-[#62A5DA] transition-colors"
              >
                <Image src="/assets/template.svg" alt="templates" width={20} height={20} />
                Templates
              </Link>
              <Button
                variant="gradient"
                onClick={signOut}
                className="w-[120px]"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="lg:hidden items-center gap-5">
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
                  className="text-heading text-[16px] font-semibold flex items-center justify-between w-full hover:text-[#62A5DA] transition-colors"
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

const App = () => (
  <SessionProvider>
    <Navbar />
  </SessionProvider>
);

export default App;
