import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/android-chrome-192x192.png";
import { CryptoDataContext } from "../context/CryptoData";

function Logo() {
  const { serverError } = useContext(CryptoDataContext);
  return (
    <>
      {serverError && (
        <div className="absolute top-4 right-4 text-sm text-red">
          Server error try after some time
        </div>
      )}
      <Link to={"/"} className="absolute top-4 left-4 flex items-center gap-2">
        <img src={logo} alt="CryptoBeacon" className="w-14 pb-2 "></img>
        <span className="text-lg text-emerald-400 font-montserat font-medium">
          CryptoBeacon
        </span>
      </Link>
    </>
  );
}

export default Logo;
