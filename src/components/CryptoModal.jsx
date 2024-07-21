import React, { useContext, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { CryptoDataContext } from "../context/CryptoData";
import Loader from "./Loader";
import { Chart } from "./Chart";
import { ReactComponent as GitSvg } from "../images/github-fill.svg";
import { ReactComponent as MetaSvg } from "../images/facebook-fill.svg";
import { ReactComponent as XSvg } from "../images/twitter-circle-filled.svg";

function CryptoModal() {
  const { coindId } = useParams();
  const navigate = useNavigate();
  const { coinData, getCoinData, modalDataLoading } =
    useContext(CryptoDataContext);

  const { filterData } = useContext(CryptoDataContext);

  // console.log(filterData);
  const closeModal = () => {
    navigate("..");
  };

  useLayoutEffect(() => {
    getCoinData(coindId);
  }, [coindId]);

  const currencyFormat = (num, currency, notation) => {
    try {
      const val = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currency.toUpperCase(),
        maximumSignificantDigits: 7,
        notation: notation,
      }).format(num);
      return val;
    } catch (err) {
      console.error("error in printing currency Intl", err);
    }
  };

  return ReactDOM.createPortal(
    <div
      onClick={closeModal}
      className="fixed font-montserat flex justify-center items-center top-0 h-full w-full bg-gray-300 bg-opacity-30 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[95%] min-h-[80%] lg:w-2/3 h-3/4 rounded-md bg-slate-300 bg-opacity-80 relative overflow-y-auto"
      >
        {modalDataLoading && <Loader></Loader>}

        {coinData.error ? (
          <>"404 not found"</>
        ) : (
          <>
            {/* {console.log("coinDataaaaaaaa", coinData)} */}
            <div className="flex justify-between flex-col md:flex-row  align-center h-full w-full p-4 relative">
              <div className="w-full md:w-5/12 px-1 py-0.5 flex flex-col h-full justify-between">
                {/* heading */}
                <div className="flex w-full items-center content-baseline flex-wrap">
                  <img src={coinData?.image?.small} alt=""></img>
                  <h1 className="text-xl font-medium capitalize">
                    {coinData?.name}
                  </h1>
                  <span className="ml-1 bg-emerald-900 uppercase text-sm text-emerald-900 font-bold bg-opacity-15 px-2 rounded-md">
                    {coinData?.symbol}
                  </span>
                </div>

                {/* price and percent change */}
                <div className="flex justify-between flex-wrap gap-2">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-100 text-sm">
                      Price
                    </span>
                    <span className="text-lg text-gray-300 font-inter fon">
                      {currencyFormat(
                        coinData?.market_data?.current_price[
                          filterData.currency
                        ],
                        filterData.currency,
                        "standard"
                      )}
                    </span>
                  </div>
                  <div>
                    <span
                      title="Price change in percentage in 24h"
                      className={`px-1 py-0.5 font-medium rounded-md ${
                        coinData?.market_data?.price_change_percentage_24h > 0
                          ? "bg-emerald-500 bg-opacity-10 font-bold text-emerald-500"
                          : "bg-red bg-opacity-15 text-red"
                      }`}
                    >
                      {Number(
                        coinData?.market_data?.price_change_percentage_24h
                      ).toFixed(2)}
                      %
                      <svg
                        className={`h-6 w-6 inline-block text-gray-500 ${
                          coinData?.market_data?.price_change_percentage_24h > 0
                            ? "fill-emerald-500 rotate-180"
                            : "fill-red"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M7 10l5 5 5-5H7z"></path>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* market cap */}
                <div className="flex justify-between flex-wrap">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-100 text-sm">
                      Market cap
                    </span>
                    <span className="text-lg text-gray-300 font-inter ">
                      {currencyFormat(
                        coinData?.market_data?.market_cap[filterData.currency],
                        filterData.currency,
                        "compact"
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-100 text-sm">
                      Fully diluted value
                    </span>
                    <span className="text-lg text-gray-300 font-inter">
                      {currencyFormat(
                        coinData?.market_data?.fully_diluted_valuation[
                          filterData.currency
                        ],
                        filterData.currency,
                        "compact"
                      )}
                    </span>
                  </div>
                </div>

                {/* total volume */}
                <div className="flex justify-between flex-wrap">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-100 text-sm">
                      Total volume
                    </span>
                    <span className="text-lg text-gray-300 font-inter ">
                      {currencyFormat(
                        coinData?.market_data?.total_volume[
                          filterData.currency
                        ],
                        filterData.currency,
                        "compact"
                      )}
                    </span>
                  </div>
                </div>

                {/*24h high and low */}
                <div className="flex justify-between flex-wrap">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-100 text-sm">
                      24H high
                    </span>
                    <span className="text-lg text-gray-300 font-inter ">
                      {currencyFormat(
                        coinData?.market_data?.high_24h[filterData.currency],
                        filterData.currency,
                        "standard"
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-100 text-sm">
                      24H Low
                    </span>
                    <span className="text-lg text-gray-200 font-inter">
                      {currencyFormat(
                        coinData?.market_data?.low_24h[filterData.currency],
                        filterData.currency,
                        "standard"
                      )}
                    </span>
                  </div>
                </div>

                {/* social links and public sentiments */}
                <div className="flex justify-between flex-wrap">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-100 text-sm">
                      Social Links
                    </span>
                    {coinData?.links?.official_forum_url?.[0] ? (
                      <span className="text-md text-gray-300 font-inter ">
                        <a
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-500 bg-slate-500 bg-opacity-15 rounded-sm px-2 "
                          href={coinData?.links?.official_forum_url?.[0]}
                        >
                          {coinData?.links?.official_forum_url?.[0].slice(
                            0,
                            25
                          )}
                        </a>
                      </span>
                    ) : (
                      ""
                    )}
                    {coinData?.links?.blockchain_site?.[0] ? (
                      <span className="text-md text-gray-300 font-inter ">
                        <a
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-500 bg-slate-500 bg-opacity-15 rounded-sm px-2 "
                          href={coinData?.links?.blockchain_site?.[0]}
                        >
                          {coinData?.links?.blockchain_site?.[0].slice(0, 25)}
                        </a>
                      </span>
                    ) : (
                      ""
                    )}
                    {coinData?.links?.subreddit_url ? (
                      <span className="text-md text-gray-300 font-inter ">
                        <a
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-500 bg-slate-500 bg-opacity-15 rounded-sm px-2 "
                          href={coinData?.links?.subreddit_url}
                        >
                          {coinData?.links?.subreddit_url.slice(0, 25)}
                        </a>
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex flex-col ">
                    <span className="font-medium text-gray-100 text-sm">
                      Public sentiment
                    </span>
                    <div>
                      <span
                        title="Price change in percentage in 24h"
                        className={`px-1 py-0.5 font-medium rounded-md ${
                          coinData?.sentiment_votes_up_percentage > 0
                            ? "bg-emerald-500 bg-opacity-10 font-bold text-emerald-500"
                            : "bg-red bg-opacity-15 text-red"
                        }`}
                      >
                        {Number(
                          coinData?.sentiment_votes_up_percentage
                        ).toFixed(2)}
                        %
                        <svg
                          className={`h-6 w-6 inline-block text-gray-500 ${
                            coinData?.sentiment_votes_up_percentage > 0
                              ? "fill-emerald-500 rotate-180"
                              : "fill-red"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M7 10l5 5 5-5H7z"></path>
                        </svg>
                      </span>
                    </div>
                    <div>
                      <span
                        title="Price change in percentage in 24h"
                        className={`px-1 py-0.5 font-medium rounded-md ${"bg-red bg-opacity-15 font-bold text-red"}`}
                      >
                        {Number(
                          coinData?.sentiment_votes_down_percentage
                        ).toFixed(2)}
                        %
                        <svg
                          className={`h-6 w-6 inline-block text-gray-500 ${"fill-red"}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M7 10l5 5 5-5H7z"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="w-full md:w-7/12 px-1 py-0.5 flex flex-col min-h-96">
                <Chart
                  coinId={coinData.id}
                  currency={filterData.currency}
                ></Chart>

                <div className="flex flex-col">
                  <h3 className="text-md">
                    <span className="text-gray-100 text-sm mr-1">
                      Market-cap rank:
                    </span>
                    {coinData.market_cap_rank}
                  </h3>
                </div>
              </div>

              {/* social links */}
              <div className="md:absolute justify-end bottom-1 right-1 flex gap-2 items-center">
                {coinData?.links?.repos_url?.github[0] && (
                  <a
                    href={coinData?.links?.repos_url?.github[0]}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <GitSvg />
                  </a>
                )}

                {coinData?.links?.twitter_screen_name && (
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={`https://x.com/${coinData?.links?.twitter_screen_name}`}
                  >
                    <XSvg />
                  </a>
                )}
                {coinData?.links?.facebook_username && (
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={`https://facebook.com/${coinData?.links?.facebook_username}`}
                  >
                    <MetaSvg />
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default CryptoModal;
