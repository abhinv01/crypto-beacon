import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/android-chrome-192x192.png";

function Logo() {
  return (
    <Link to={"/"} className="absolute top-4 left-4 flex items-center gap-2">
      <img src={logo} alt="CryptoBeacon" className="w-14 pb-2 "></img>
      <span className="text-lg text-emerald-400 font-montserat font-medium">
        CryptoBeacon
      </span>
    </Link>
  );
}

export default Logo;
