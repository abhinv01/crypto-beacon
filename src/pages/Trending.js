import React, { useContext } from "react";
import { TrendingContext } from "../context/TrendingContext";
import TrendingCard from "../components/TrendingCard";
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader";

const Trending = () => {
  let { trendingCoin, trendLoading, resetTrending } =
    useContext(TrendingContext);

  console.log(trendingCoin, trendLoading);
  return (
    <section className="w-[95%] md:w-[80%] h-full flex flex-col mt-16 mb-16 lg:mb-24 relative">
      {trendLoading && <Loader></Loader>}
      <div className="flex justify-center items-center absolute right-1/2 translate-x-1/2 top-5">
        <button
          onClick={() => resetTrending()}
          className="border-2 border-slate-300 bg-slate-200 rounded-md active:bg-gray-100 px-2 hover:text-emerald-600"
        >
          Refresh
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="fill-emerald-500 inline-block "
          >
            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
          </svg>
        </button>
      </div>
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mx-auto w-full min-h-[60vh] py-8 mt-9 border border-gray-100 rounded">
        {trendingCoin.length > 0 ? (
          <>
            {trendingCoin.map((coin) => (
              <TrendingCard key={coin.item.id} data={coin?.item}></TrendingCard>
            ))}
          </>
        ) : (
          ""
        )}
      </div>
      <Outlet></Outlet>
    </section>
  );
};

export default Trending;
