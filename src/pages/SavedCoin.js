import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { StorageContext } from "../context/StorageContext";
import Loader from "../components/Loader";
import { CryptoDataContext } from "../context/CryptoData";

const SavedCoin = () => {
  const {
    savedCrypto,
    setSavedCrypto,
    errorSaved,
    storageLoading,
    savedCoinsData,
    resetStorage,
  } = useContext(StorageContext);

  const { filterData } = useContext(CryptoDataContext);
  const navigate = useNavigate();

  const saveCoin = (id) => {
    console.log(savedCrypto);
    if (savedCrypto.includes(id)) {
      const newSavedCrypto = savedCrypto.filter((ele) => ele !== id);
      setSavedCrypto(newSavedCrypto);
      localStorage.setItem("cryptoCoins", JSON.stringify(newSavedCrypto));
    } else {
      localStorage.setItem("cryptoCoins", JSON.stringify([...savedCrypto, id]));
      setSavedCrypto((prev) => [...prev, id]);
    }
  };

  const currencyFormat = (num) => {
    try {
      const val = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: filterData.currency.toUpperCase(),
      }).format(num);

      return val;
    } catch (err) {
      console.error("error in printing currency Intl", err);
    }
  };
  return (
    <section className="w-[95%] md:w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <div className="flex justify-center items-center absolute right-1/2 translate-x-1/2 top-0">
        <button
          onClick={resetStorage}
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
      </div>{" "}
      {storageLoading && <Loader></Loader>}
      <>
        <div className="shadow-lg flex flex-col mt-9 border border-gray-100 rounded overflow-auto min-h-[15vh]">
          {errorSaved.error ? (
            <div className="text-red font-bold text-lg">{errorSaved.error}</div>
          ) : null}
          {savedCoinsData.length > 0 && (
            <table className="w-full table-auto overflow-x-auto">
              <thead className="capitalize text-base text-gray-100 font-medium border-b border-gray-100">
                <tr>
                  <th className="py-1" title="Acronym for Coin">
                    Asset
                  </th>
                  <th className="py-1" title="Name of the coin">
                    Name
                  </th>
                  <th
                    className="py-1"
                    title="Price of coin in selected currency"
                  >
                    Price
                  </th>
                  <th
                    className="py-1"
                    title={`Coin's total trading volume in selected currency (${filterData.currency})`}
                  >
                    Volume
                  </th>
                  <th
                    className="py-1"
                    title="coin's 24h market cap change in percentage"
                  >
                    market cap change
                  </th>
                  <th
                    className="py-1"
                    title="coin's 1 hour price change in percentage

            "
                  >
                    1h
                  </th>
                  <th
                    className="py-1"
                    title="coin's 24 hours price change in percentage"
                  >
                    24h
                  </th>
                  <th
                    className="py-1"
                    title="coin's 7 Days price change in percentage"
                  >
                    7D
                  </th>
                </tr>
              </thead>
              <tbody>
                {savedCoinsData.map((data) => {
                  return (
                    <tr
                      key={data.id}
                      onClick={(e) => {
                        navigate(`${data.id}`, { state: { filterData } });
                      }}
                      className="text-center text-black border-b border-gray-100 hover:bg-slate-200 last:border-b-0"
                    >
                      <td className="py-4">
                        <div className="flex flex-row justify-evenly">
                          <button
                            className="border-0 bg-none cursor-pointer"
                            title="Save coin"
                            onClick={(e) => {
                              e.stopPropagation();
                              saveCoin(data.id);
                            }}
                          >
                            <svg
                              className={`${
                                savedCrypto.includes(data.id)
                                  ? "fill-gold-100"
                                  : "fill-gray-100"
                              } hover:stroke-gold-100 stroke-2`}
                              height="30"
                              width="30"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 47.94 47.94"
                              xmlSpace="preserve"
                            >
                              <path
                                style={{ filter: "url(#stroke-shadow)" }}
                                d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
                  c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
                  c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
                  c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
                  c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
                  C22.602,0.567,25.338,0.567,26.285,2.486z"
                              />
                            </svg>
                          </button>
                          <span
                            className="uppercase flex flex-col items-center"
                            title="Coin Accronym"
                          >
                            <img
                              title="Coin Icon"
                              className="w-[2rem]"
                              src={data.image}
                              alt={data.name}
                            ></img>
                            {data.symbol}
                          </span>
                        </div>
                      </td>
                      <td className="py-4" title="Coin Name">
                        {data.name}
                      </td>
                      <td
                        className="py-4 first-letter:font-bold"
                        title="Coin Price in Selected Currency"
                      >
                        {currencyFormat(data.current_price)}
                      </td>
                      <td
                        className="py-4"
                        title={`Coin's total trading volume in selected currency (${filterData.currency})`}
                      >
                        {data.total_volume}
                      </td>
                      <td
                        className="py-4"
                        title="coin's 24h market cap change in percentage"
                      >
                        {data.market_cap_change_percentage_24h != null
                          ? data.market_cap_change_percentage_24h.toFixed(2) +
                            "%"
                          : "N/A"}
                      </td>
                      <td
                        title="coin's 1h price change in %"
                        className={`py-4 ${
                          data.price_change_percentage_1h_in_currency > 0
                            ? "text-green"
                            : "text-red"
                        }`}
                      >
                        {Number(
                          data.price_change_percentage_1h_in_currency
                        ).toFixed(2)}
                      </td>
                      <td
                        title="coin's 24h price change in %"
                        className={`py-4 ${
                          data.price_change_percentage_24h_in_currency > 0
                            ? "text-green"
                            : "text-red"
                        }`}
                      >
                        {Number(
                          data.price_change_percentage_24h_in_currency
                        ).toFixed(2)}
                      </td>
                      <td
                        title="coin's 7d price change in %"
                        className={`py-4 ${
                          data.price_change_percentage_7d_in_currency > 0
                            ? "text-green"
                            : "text-red"
                        }`}
                      >
                        {Number(
                          data.price_change_percentage_7d_in_currency
                        ).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {savedCoinsData?.length === 0 && (
            <div className="text-center font-montserat font-medium  text-slate-400">
              {" "}
              ⛔No saved Coins
            </div>
          )}
        </div>
      </>
      <Outlet></Outlet>
    </section>
  );
};

export default SavedCoin;
