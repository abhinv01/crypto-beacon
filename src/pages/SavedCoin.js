import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { StorageContext } from "../context/StorageContext";
import Loader from "../components/Loader";

const SavedCoin = () => {
  const { savedCrypto, storageLoading } = useContext(StorageContext);
  return (
    <section className="w-[95%] md:w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      {storageLoading && <Loader></Loader>}
      <div className="flex justify-center items-center absolute right-1/2 translate-x-1/2 top-5"></div>
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mx-auto w-full min-h-[60vh] py-8 mt-9 border border-gray-100 rounded"></div>
      <Outlet></Outlet>
    </section>
  );
};

export default SavedCoin;
