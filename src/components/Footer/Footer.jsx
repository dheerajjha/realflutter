import { Facebook, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center py-10 bg-[#ECF4FB] border-t">
      <div className="space-y-8 flex items-center justify-center flex-col">
        <Link href="/">
          <Image src="/assets/logo.png" alt="logo" width={160} height={60} />
        </Link>
        <div className="flex items-center gap-10 font-semibold text-[16px]">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <div className="flex items-center gap-10">
            <Link href="/privacy-policy" className="hover:text-[#16509B] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[#16509B] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-7">
          <Image src="/assets/linkedin.png" alt="logo" width={28} height={28} />
          <Image src="/assets/twitter.png" alt="logo" width={25} height={25} />
          <Image src="/assets/facebook.png" alt="logo" width={30} height={30} />
        </div>
        <div className="text-muted-foreground">
          Copyright © {new Date().getFullYear()}{" "}
          <span className="text-[#16509B] font-medium">Real Flutter.</span> All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
