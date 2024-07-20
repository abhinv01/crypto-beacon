import React from "react";
import { useNavigate } from "react-router-dom";

const currencyFormat = (num, currency = "BTC", notation = "compact") => {
  try {
    const val = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency.toUpperCase(),
      maximumSignificantDigits: 5,
      notation: notation,
    }).format(num);
    return val;
  } catch (err) {
    console.error("error in printing currency Intl", err);
  }
};
const TrendingCard = ({ data }) => {
  const navigate = useNavigate();
  const showDetails = (id) => {
    navigate(id);
  };
  return (
    <div
      onClick={() => showDetails(data.id)}
      className="bg-slate-300 rounded-lg p-4 relative cursor-pointer border-2 border-transparent hover:bg-transparent hover:border-gray-100 hover:border-2"
    >
      {!data ? null : (
        <>
          <div className="flex items-center">
            <span className="font-medium text-gray-100 text-sm ">Name:</span>
            <span className="text-md text-emerald-600 font-inter mx-2 ">
              {data.name}
            </span>
            <img
              alt={data.name}
              src={data.large}
              className="rounded-full w-20 absolute -right-4 "
            ></img>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-100 text-sm mr-2">
              Market cap Rank:
            </span>
            <span className="text-md text-emerald-600 font-inter ">
              {data.market_cap_rank}
            </span>
          </div>
          <div className="flex items-center flex-wrap">
            <span className="font-medium text-gray-100 text-sm mr-2">
              Price in Bitcoin:
            </span>
            <span className="text-md text-emerald-600 font-inter flex flex-wrap ">
              {currencyFormat(data.price_btc)}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default TrendingCard;
