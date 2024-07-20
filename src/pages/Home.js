import React from "react";
import Logo from "../components/Logo";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import { CryptoProvider } from "../context/CryptoData";
import { TrendingProvider } from "../context/TrendingContext";
import { StorageProvider } from "../context/StorageContext";
// import { CryptoDataProvider } from "../context/CryptoData";

const Home = () => {
  return (
    <CryptoProvider>
      <TrendingProvider>
        <StorageProvider>
          <div className="font-inter w-full h-full text-dark flex flex-col content-center items-center relative">
            <div className="bg-slate-50 w-screen h-screen fixed -z-10"></div>
            <Logo></Logo>
            <Navigation></Navigation>
            <Outlet></Outlet>
          </div>
        </StorageProvider>
      </TrendingProvider>
    </CryptoProvider>
  );
};

export default Home;
