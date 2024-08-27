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
          <Link href="/auth/login">Home</Link>
          <Link href="/auth/signup">About</Link>
          <Link href="/auth/signup">Contact</Link>
          <Link href="/auth/signup">Legal</Link>
        </div>
        <div className="flex items-center gap-7">
          <Image src="/assets/linkedin.png" alt="logo" width={28} height={28} />
          <Image src="/assets/twitter.png" alt="logo" width={25} height={25} />
          <Image src="/assets/facebook.png" alt="logo" width={30} height={30} />
        </div>
        <div className="text-muted-foreground">
          Copyright © 2024{" "}
          <span className="text-[#16509B] font-medium">Real Flutter.</span> All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
