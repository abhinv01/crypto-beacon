import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="shadow-lg md:w-fit md:min-w-[40%] w-[95%] mt-20 flex align-middle justify-around border border-solid border-emerald-500 rounded-lg">
      <NavLink
        end
        to="/"
        className={({ isActive }) => {
          return `px-1 w-full text-base font-inter m-2 ${
            isActive
              ? "bg-emerald-400 text-gray-300 shadow-md"
              : "bg-slate-300 text-gray-200 hover:text-emerald-700 active:bg-emerald-400 active:text-gray-300"
          }  text-center border-0 cursor-pointer rounded capitalize font-semibold`;
        }}
      >
        CryptoCoins
      </NavLink>
      <NavLink
        end
        to="/trending"
        className={({ isActive }) => {
          return `px-1 w-full text-base font-inter m-2 ${
            isActive
              ? "bg-emerald-400 text-gray-300 shadow-md"
              : "bg-slate-300 text-gray-200 hover:text-emerald-700 active:bg-emerald-400 active:text-gray-300"
          }  text-center border-0 cursor-pointer rounded capitalize font-semibold`;
        }}
      >
        Trending
      </NavLink>
      <NavLink
        end
        to="/savedcoin"
        className={({ isActive }) => {
          return `px-1 w-full text-base font-inter m-2 ${
            isActive
              ? "bg-emerald-400 text-gray-300 shadow-md"
              : "bg-slate-300 text-gray-200 hover:text-emerald-700 active:bg-emerald-400 active:text-gray-300"
          }  text-center border-0 cursor-pointer rounded capitalize font-semibold`;
        }}
      >
        SavedCoin
      </NavLink>
    </nav>
  );
};

export default Navigation;
