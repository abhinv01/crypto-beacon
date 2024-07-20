import React, { useContext } from "react";
import Table from "../components/Table";
import FilterComp from "../components/FIlterComp";
import { Outlet } from "react-router-dom";
import { CryptoDataContext } from "../context/CryptoData";

const Crypto = () => {
  // const [filterData, setFilterData] = useState({
  //   currency: "inr",
  //   search: "",
  //   sortBy: "market_cap_desc",
  // });

  const { filterData, setFilterData } = useContext(CryptoDataContext);
  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <FilterComp
        setFilterData={setFilterData}
        filterData={filterData}
      ></FilterComp>
      <Table filterData={filterData}></Table>
      <Outlet></Outlet>
    </section>
  );
};

export default Crypto;
