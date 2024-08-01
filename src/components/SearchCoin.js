import React, { useState, useContext } from "react";
import { CryptoDataContext } from "../context/CryptoData";

const SearchCoin = ({ search, setSetsearch, currency, setFilterData }) => {
  let {
    cryptoSearchData,
    getCryptoSearchData,
    getCryptoDataForSelectedCoin,
    setCryptoSearchData,
  } = useContext(CryptoDataContext);

  const [timeoutId, updatetimeoutId] = useState();

  const handleSearchInput = (e) => {
    //debouncing concept
    clearTimeout(timeoutId);
    setSetsearch(e.target.value);
    setFilterData((prev) => ({ ...prev, search: e.target.value }));

    const timeout = setTimeout(() => getCryptoSearchData(e.target.value), 2000);
    updatetimeoutId(timeout);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;

    if (form.checkValidity()) {
      // Process form data here
      console.log("Form submitted:");
      getCryptoSearchData(search);
    } else {
      // If form is invalid, trigger native form validation
      form.reportValidity();
    }
  };

  const getSelectedCoinData = (coinId) => {
    console.log(search, coinId);
    getCryptoDataForSelectedCoin(currency, coinId);
    setSetsearch("");
    setFilterData((prev) => ({ ...prev, search: "" }));
    setCryptoSearchData([]);
  };
  return (
    <>
      <form
        onSubmit={handleSearch}
        className=" relative flex items-center border-2 border-slate-300 rounded-md focus-within:border-emerald-400"
      >
        <input
          value={search}
          onChange={handleSearchInput}
          required
          type="search"
          placeholder="Search coin"
          className=" px-2 py-0.5 outline-none border-transparent focus:bg-white font-inter rounded-tl-md rounded-bl-md bg-slate-200"
        ></input>
        <button
          type="submit"
          className="border-emerald-400 active:bg-gray-100 py-0.5 bg-slate-200 rounded-tr-md rounded-br-md "
          // onSubmit={handleSearch}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-emerald-400 w-full"
          >
            <path
              d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z"
              //   fill="#14FFEC"
            />
          </svg>
        </button>
      </form>

      {search.length > 0 ? (
        <ul className="absolute top-8 left-0 w-full max-h-80 bg-opacity-50 bg-slate-500 backdrop-blur-md rounded overflow-x-hidden p-2 z-10">
          {cryptoSearchData.length > 0 ? (
            cryptoSearchData.map((element) => {
              return (
                <li
                  key={element.id}
                  className="flex my-2 items-center gap-2 cursor-pointer hover:bg-slate-100"
                  onClick={
                    element.symbol !== "NoCoin"
                      ? () => getSelectedCoinData(element.id)
                      : null
                  }
                >
                  <img
                    className="w-[2rem] rounded-full"
                    src={element.thumb}
                    alt={element.name}
                  ></img>
                  {element.name}{" "}
                </li>
              );
            })
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              {/* loader */}
              <div className="w-10 h-10 border-emerald-600 rounded-full border-4 border-t-transparent animate-spin" />
              <span className="text-sm mx-2">Please wait... </span>
            </div>
          )}
        </ul>
      ) : null}
    </>
  );
};

export default SearchCoin;
