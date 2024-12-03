"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import analytics from "@/lib/analytics/service";

const Hero = ({ search, setSearch }) => {
  const handleSearch = (value) => {
    setSearch(value);
    if (value) {
      analytics.search(value, 'hero_search');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search) {
      analytics.logEvent('search_submit', {
        search_term: search,
        location: 'hero'
      });
    }
  };

  return (
    <section className="w-full bg-[#122030] h-auto md:h-[450px] flex items-center justify-center py-10 lg:py-0 relative">
      <div className="flex flex-col gap-2 items-center justify-center p-3 md:px-8 md:p-5 lg:p-0 z-10">
        <Image src="/assets/white-logo.png" alt="logo" width={35} height={35} />
        <h1 className="text-white font-medium text-[40px] md:text-[50px] lg:text-[60px] text-center">
          Elevate your <span className="text-[#62A5DA]">Flutter</span>{" "}
          experience
        </h1>
        <p className="text-white font-medium text-[16px] lg:text-[25px] max-w-5xl text-center">
          Welcome to <span className="text-[#62A5DA]">Real Flutter</span>, your
          one- stop destination for an extensive collection of widgets and
          Flutter packages.{" "}
        </p>
        <div className="flex items-center justify-between text-[#62A5DA] max-w-2xl gap-5 font-medium mt-3  text-[16px] lg:text-[20px]">
          <span>Explore</span>•<span>Discover</span>•<span>Integrate</span>
        </div>
        <form onSubmit={handleSearchSubmit} className="max-w-4xl w-full mt-6 relative">
          <input
            type="text"
            className="p-[12px] rounded-full text-[#ffffff66] w-full pl-12 text-[16px] bg-[#1A2B3A] border-none focus:outline-none bg-[linear-gradient(270deg,_rgba(255,_255,_255,_0.1)_0%,_rgba(255,_255,_255,_0.25)_50.3%,_rgba(255,_255,_255,_0.1)_100%)]"
            placeholder="Search packages here "
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Search
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Button
            variant="gradient"
            className="absolute top-1/2 right-1 transform -translate-y-1/2 px-8"
            type="submit"
          >
            Search
          </Button>
        </form>
      </div>
      <Image
        src="/assets/leaf.png"
        alt="leaf"
        width={160}
        height={160}
        className="absolute hidden lg:flex top-[8%] left-[5%] transform rotate-90 z-0"
      />
      <Image
        src="/assets/leaf.png"
        alt="leaf"
        width={160}
        height={160}
        className="absolute hidden lg:flex bottom-[7%] right-[5%] z-0"
      />
    </section>
  );
};

export default Hero;
