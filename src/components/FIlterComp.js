import React, { useContext, useState } from "react";
import SearchCoin from "./SearchCoin";
import { currencies } from "../extramodule/someFunctions";
import { CryptoDataContext } from "../context/CryptoData";

function FilterComp({ setFilterData, filterData }) {
  const [currency, setCurrency] = useState(filterData.currency);
  const [search, setSetsearch] = useState(filterData.search);
  const [sortBy, setSortBy] = useState(filterData.sortBy);

  let { getCryptoDataCurrencyWise, getCryptoDataToSort } =
    useContext(CryptoDataContext);

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (form.checkValidity()) {
      // Process form data here
      console.log("Form submitted:");
      setFilterData((prev) => ({ ...prev, currency: currency }));
      getCryptoDataCurrencyWise(currency, search);
    } else {
      // If form is invalid, trigger native form validation
      form.reportValidity();
    }
  };

  const handleSortBy = (e) => {
    console.log(e.target.value);
    setSortBy(e.target.value);
    getCryptoDataToSort(currency, e.target.value);
  };

  return (
    <div className="w-full border rounded h-14 border-gray-100 shadow-lg p-2 flex justify-between gap-4 items-center">
      <div className="mr-auto">
        <SearchCoin
          search={search}
          setSetsearch={setSetsearch}
          setFilterData={setFilterData}
          currency={currency}
        ></SearchCoin>
      </div>
      <div>
        {" "}
        <form
          onSubmit={handleCurrencySubmit}
          className="relative flex items-center border-2 border-slate-300 rounded-md focus-within:border-emerald-400"
        >
          <input
            list="keywords"
            value={currency}
            onChange={handleCurrencyChange}
            required
            type="text"
            placeholder="Currency(inr)"
            className="lowercase w-16 px-2 py-0.5 outline-none border-transparent focus:bg-white font-inter rounded-tl-md rounded-bl-md bg-slate-200"
          ></input>
          <datalist id="keywords">
            {currencies.map((element, i) => (
              <option key={i} value={element.currency}>
                {element.country}
              </option>
            ))}
          </datalist>
          <button
            type="submit"
            className="border-emerald-400 active:bg-gray-100 py-0.5 px-1 bg-slate-200 rounded-tr-md rounded-br-md "
            // onSubmit={handleSearch}
          >
            <svg
              className="fill-emerald-400 w-4 h-6 overflow-hidden stroke-emerald-400 stroke-2"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="#50c878"
                strokeWidth="50"
                d="M507.896542 967.660854c-248.415766 0-450.535113-202.109114-450.535113-450.545346S259.480776 66.571185 507.896542 66.571185c248.436232 0 450.555579 202.109114 450.555579 450.545346S756.332774 967.660854 507.896542 967.660854zM507.896542 97.719602c-231.260038 0-419.386696 188.136891-419.386696 419.396929s188.126658 419.396929 419.386696 419.396929S927.303704 748.376569 927.303704 517.116531 739.15658 97.719602 507.896542 97.719602z"
              />
              <path
                stroke="#50c878"
                strokeWidth="50"
                d="M600.461751 535.083741c4.473895 0 8.924253-1.702782 12.329816-5.109368 6.812149-6.812149 6.812149-17.848507 0-24.660656L473.875704 366.408087c-6.812149-6.812149-17.848507-6.812149-24.660656 0s-6.812149 17.848507 0 24.660656l138.916886 138.90563C591.537498 533.379936 595.98888 535.083741 600.461751 535.083741z"
              />
              <path
                stroke="#50c878"
                strokeWidth="50"
                d="M461.969537 673.575956c4.473895 0 8.924253-1.702782 12.329816-5.109368L609.475032 533.290909c6.812149-6.812149 6.812149-17.848507 0-24.660656s-17.848507-6.812149-24.660656 0L449.638697 643.805932c-6.812149 6.812149-6.812149 17.848507 0 24.660656C453.045283 671.873174 457.495642 673.575956 461.969537 673.575956z"
              />
            </svg>
          </button>
        </form>
      </div>
      <div>
        <label
          htmlFor="sortBy"
          className="bg-slate-200 relative flex items-center border-2 border-slate-300 rounded-md pl-1 group focus-within:border-emerald-500 "
        >
          <span className="font-bold mr-2 text-sm text-gray-100 group-focus-within:text-emerald-400">
            Sort by:
          </span>
          <style>
            {`
          select::-ms-expand {
            display: none;
          }

          select {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }
        `}
          </style>
          <select
            className="rounded text-base  pl-2 pr-10 py-0.5 capitalize outline-0 bg-slate-200 focus:bg-white"
            id="sortBy"
            value={sortBy}
            onChange={handleSortBy}
          >
            <option value="market_cap_asc">market cap asc</option>
            <option value="market_cap_desc">market cap desc</option>
            <option value="volume_asc">volume asc</option>
            <option value="volume_desc">volume desc</option>
            <option value="id_asc">id asc</option>
            <option value="id_desc">id desc</option>
          </select>
          <div className="custom-arrow pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="h-6 w-6 text-gray-500 fill-emerald-400 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </label>
      </div>
    </div>
  );
}

export default FilterComp;
