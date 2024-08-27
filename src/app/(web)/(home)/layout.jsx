import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/navbar/navbar";
import React from "react";

const HomeLayout = ({ children }) => {
  return (
    <main className="font-normal">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default HomeLayout;
