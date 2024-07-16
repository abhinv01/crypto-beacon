import React, { useState } from "react";
import Table from "../components/Table";
import FilterComp from "../components/FIlterComp";

const Crypto = () => {
  const [filterData, setFilterData] = useState({
    currency: "inr",
    search: "",
    sortBy: "market_cap_desc",
  });
  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      Crypto.s
      <FilterComp
        setFilterData={setFilterData}
        filterData={filterData}
      ></FilterComp>
      <Table filterData={filterData}></Table>
    </section>
  );
};

export default Crypto;
