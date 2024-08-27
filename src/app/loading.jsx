import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#62A5DA]"></div>
    </div>
  );
};

export default Loader;
