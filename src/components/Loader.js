import React from "react";

function Loader() {
  return (
    <div className="absolute inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center z-20">
      <div className="border-4 border-t-transparent animate-spin h-12 w-12 rounded-full border-emerald-400"></div>
    </div>
  );
}

export default Loader;
