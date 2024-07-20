import React, { useContext, useEffect, useState } from "react";
import { CryptoDataContext } from "../context/CryptoData";

function Pagination({ filterData }) {
  const { getCryptoDataForPage, lastPage } = useContext(CryptoDataContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [last, setLast] = useState(Math.ceil(lastPage / 10));

  useEffect(() => {
    setLast(Math.ceil(lastPage / 10));
  }, [lastPage]);

  const nextPage = async () => {
    if (currentPage < last) {
      getCryptoDataForPage(
        currentPage + 1,
        filterData.currency,
        filterData.search,
        filterData.sortBy
      );
      setCurrentPage((prev) => prev + 1);
    } else return;
  };

  const previousPage = () => {
    if (currentPage > 1) {
      getCryptoDataForPage(
        currentPage - 1,
        filterData.currency,
        filterData.search,
        filterData.sortBy
      );
      setCurrentPage((prev) => prev - 1);
    } else return;
  };

  const addThreePage = () => {
    if (currentPage + 2 < last) {
      getCryptoDataForPage(
        currentPage + 3,
        filterData.currency,
        filterData.search,
        filterData.sortBy
      );
      setCurrentPage((prev) => prev + 3);
    } else return;
  };
  const subtractThreePage = () => {
    if (currentPage - 2 > 1) {
      getCryptoDataForPage(
        currentPage - 3,
        filterData.currency,
        filterData.search,
        filterData.sortBy
      );
      setCurrentPage((prev) => prev - 3);
    } else return;
  };

  const firstPage = () => {
    getCryptoDataForPage(
      1,
      filterData.currency,
      filterData.search,
      filterData.sortBy
    );
    setCurrentPage(1);
  };

  const getLastPage = () => {
    getCryptoDataForPage(
      last,
      filterData.currency,
      filterData.search,
      filterData.sortBy
    );
    setCurrentPage(last);
  };
  return (
    <div className="ml-auto flex items-center font-inter">
      <ul className="flex">
        {currentPage > 2 ? (
          <li className="bg-slate-600 mx-1 rounded-sm text-slate-100 hover:text-emerald-400 active:bg-emerald-500 h-6">
            <button
              onClick={firstPage}
              className="px-1.5 flex items-center justify-center leading-none w-full h-full"
            >
              1
            </button>
          </li>
        ) : null}
        {currentPage - 2 > 1 ? (
          <li className="bg-slate-400 mx-1 rounded-sm text-gray-200 hover:text-white active:bg-emerald-500 h-6">
            <button
              onClick={subtractThreePage}
              className="px-1.5 flex items-center justify-center leading-none w-full h-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="-rotate-90 hover:fill-white"
              >
                <g>
                  <polygon points="12 6.414 19.293 13.707 20.707 12.293 12 3.586 3.293 12.293 4.707 13.707 12 6.414" />
                  <polygon points="3.293 18.293 4.707 19.707 12 12.414 19.293 19.707 20.707 18.293 12 9.586 3.293 18.293" />
                </g>
              </svg>
            </button>
          </li>
        ) : null}
        {currentPage > 1 ? (
          <li className="bg-slate-400 mx-1 rounded-full text-gray-200 hover:text-white active:bg-emerald-500">
            <button className="min-w-6 px-0.5" onClick={previousPage}>
              {currentPage - 1}
            </button>
          </li>
        ) : null}
        <li className="bg-emerald-500 mx-1 rounded-full text-white">
          <div className="min-w-6 px-0.5 text-center">{currentPage}</div>
          {/* <input
            value={2}
            required
            type="number"
            placeholder="page number"
            className="lowercase w-16 px-2 py-0.5 outline-none border-transparent focus:bg-white font-inter rounded-tl-md rounded-bl-md bg-slate-200"
          ></input> */}
        </li>
        {currentPage + 1 > last ? null : (
          <li className="bg-slate-400 mx-1 rounded-full text-gray-200 hover:text-white active:bg-emerald-500">
            <button className="min-w-6 px-0.5" onClick={nextPage}>
              {currentPage + 1}
            </button>
          </li>
        )}
        {currentPage + 2 > last ? null : (
          <li className="bg-slate-400 mx-1 rounded-sm text-gray-200 hover:text-white active:bg-emerald-500 h-6">
            <button
              onClick={addThreePage}
              className="px-1.5 flex items-center justify-center leading-none w-full h-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="rotate-90 hover:fill-white"
              >
                <g>
                  <polygon points="12 6.414 19.293 13.707 20.707 12.293 12 3.586 3.293 12.293 4.707 13.707 12 6.414" />
                  <polygon points="3.293 18.293 4.707 19.707 12 12.414 19.293 19.707 20.707 18.293 12 9.586 3.293 18.293" />
                </g>
              </svg>
            </button>
          </li>
        )}
        {currentPage >= last ? null : (
          <li className="bg-slate-600 mx-1 rounded-sm text-slate-100 hover:text-emerald-400 active:bg-emerald-500 h-6">
            <button
              onClick={getLastPage}
              className="px-1.5 flex items-center justify-center leading-none w-full h-full"
            >
              {last}
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
export default Pagination;
