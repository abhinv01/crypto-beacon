// import { createContext, useState } from "react";

import { createContext, useLayoutEffect, useState } from "react";
import icon from "../images/android-chrome-192x192.png";

// export const CryptoDataContext = createContext({});

// export const CryptoProvider = ({ children }) => {
// const [test, setTest] = useState("this is test");
//   return (
//     <CryptoDataContext.Provider value={{ test }}>
//       {children}
//     </CryptoDataContext.Provider>
//   );
// };

const CryptoDataContext = createContext({});

const CryptoProvider = (props) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [coinData, setCoinData] = useState({});
  const [cryptoSearchData, setCryptoSearchData] = useState([]);
  const [error, setError] = useState({ error: "" });
  const [lastPage, setLastPage] = useState(14899);
  const [cryptoDataLoading, setCryptoDataLoading] = useState(false);
  const [filterData, setFilterData] = useState({
    currency: "inr",
    search: "",
    sortBy: "market_cap_desc",
  });
  const [serverError, setServerError] = useState(false);
  const [modalDataLoading, setModalDataLoading] = useState(false);

  useLayoutEffect(() => {
    async function getLastPage() {
      try {
        const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`)
          .then((res) => {
            if (res.status !== 200) setServerError(true);
            else setServerError(false);
            return res.json();
          })
          .then((data) => data);
        setLastPage(data.length);
      } catch (error) {
        console.log(error);
        setLastPage(100);
      }
    }
    getLastPage();
  }, [lastPage]);

  const getCryptoData = async () => {
    try {
      setCryptoDataLoading(true);
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1y%2C7d%2C24h%2C1h&x_cg_demo_api_key=${process.env.REACT_APP_COIN_API}`
      )
        .then((res) => {
          if (res.status !== 200) setServerError(true);
          else setServerError(false);
          return res.json();
        })
        .then((data) => data);
      // console.log(data);
      if (data.error) setError((prev) => ({ ...prev, ...data }));
      else setError({ error: "" });
      setCryptoData(data);
    } catch (error) {
      console.log(error);
      setCryptoDataLoading(false);

      setCryptoData([]);
    } finally {
      setCryptoDataLoading(false);
    }
  };

  const getCryptoDataForPage = async (page, currency, coinId = "", sortBy) => {
    try {
      setCryptoDataLoading(true);
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinId}&order=${sortBy}&per_page=10&page=${page}&sparkline=false&price_change_percentage=1y%2C7d%2C24h%2C1h`
      )
        .then((res) => res.json())
        .then((data) => data);
      console.log(data);
      if (data.error) setError((prev) => ({ ...prev, ...data }));
      else setError({ error: "" });
      setCryptoData(data);
    } catch (error) {
      console.log(error);
      setCryptoData([]);
    } finally {
      setCryptoDataLoading(false);
    }
  };

  const getCryptoDataForSelectedCoin = async (currency, coinId) => {
    try {
      setCryptoDataLoading(true);

      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinId}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1y%2C7d%2C24h%2C1h`
      )
        .then((res) => res.json())
        .then((data) => data);
      console.log(data);
      setCryptoData(data);
    } catch (error) {
      console.log(error);
      setCryptoData([]);
    } finally {
      setCryptoDataLoading(false);
    }
  };

  const getCryptoDataCurrencyWise = async (currency = "inr", search = "") => {
    try {
      setCryptoDataLoading(true);

      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${search}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1y%2C7d%2C24h%2C1h`
      )
        .then((res) => res.json())
        .then((data) => data);
      // console.log(data);
      if (data.error) setError((prev) => ({ ...prev, ...data }));
      else setError({ error: "" });
      setCryptoData(data);
    } catch (error) {
      console.log(error);
      setCryptoData([]);
    } finally {
      setCryptoDataLoading(false);
    }
  };

  const getCryptoDataToSort = async (currency, sortBy) => {
    try {
      setCryptoDataLoading(true);

      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${sortBy}&per_page=10&page=1&sparkline=false&price_change_percentage=1y%2C7d%2C24h%2C1h`
      )
        .then((res) => res.json())
        .then((data) => data);
      console.log(data);
      setCryptoData(data);
    } catch (error) {
      console.log(error);
      setCryptoData([]);
    } finally {
      setCryptoDataLoading(false);
    }
  };

  const getCryptoSearchData = async (searchQuery) => {
    try {
      // setCryptoDataLoading(true);

      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${searchQuery}`
      )
        .then((res) => res.json())
        .then((data) => data.coins);
      console.log(data);
      if (data.length > 0) setCryptoSearchData(data);
      else
        setCryptoSearchData([
          {
            api_symbol: "tokocrypto",
            id: "tokocrypto",
            large:
              "https://coin-images.coingecko.com/coins/images/14577/large/tko-logo.png",
            market_cap_rank: 899,
            name: "No coin found",
            symbol: "NoCoin",
            thumb: icon,
          },
        ]);
    } catch (error) {
      console.log(error);
    } finally {
      // setCryptoDataLoading(false);
    }
  };

  const getCoinData = async (coinIdFromUrl) => {
    try {
      setModalDataLoading(true);
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinIdFromUrl}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
      )
        .then((res) => res.json())
        .then((data) => data);
      // console.log(data);
      setCoinData(data);
    } catch (error) {
      console.log(error);
      setCoinData({});
      setModalDataLoading(false);
    } finally {
      setModalDataLoading(false);
    }
  };

  useLayoutEffect(() => {
    getCryptoData();
  }, []);
  return (
    <CryptoDataContext.Provider
      value={{
        cryptoData,
        cryptoSearchData,
        setCryptoSearchData,
        getCryptoSearchData,
        getCryptoDataForSelectedCoin,
        getCryptoDataCurrencyWise,
        getCryptoDataToSort,
        getCryptoDataForPage,
        getCoinData,
        error,
        lastPage,
        cryptoDataLoading,
        coinData,
        setFilterData,
        filterData,
        modalDataLoading,
        serverError,
      }}
    >
      {props.children}
    </CryptoDataContext.Provider>
  );
};

export { CryptoProvider, CryptoDataContext };
