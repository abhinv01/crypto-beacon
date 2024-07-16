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
  const [cryptoSearchData, setCryptoSearchData] = useState([]);
  const [error, setError] = useState({ error: "" });
  const [lastPage, setLastPage] = useState(100);

  useLayoutEffect(() => {
    async function getLastPage() {
      try {
        const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`)
          .then((res) => res.json())
          .then((data) => data);
        console.log("data", data);
        setLastPage(data.length);
      } catch (error) {
        console.log(error);
        setLastPage(100);
      }
    }
    getLastPage();
  }, []);

  const getCryptoData = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1y%2C7d%2C24h%2C1h`
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
    }
  };

  const getCryptoDataForPage = async (page, currency, coinId = "", sortBy) => {
    try {
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
    }
  };

  const getCryptoDataForSelectedCoin = async (currency, coinId) => {
    try {
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
    }
  };

  const getCryptoDataCurrencyWise = async (currency, search = "") => {
    try {
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
    }
  };

  const getCryptoDataToSort = async (currency, sortBy) => {
    try {
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
    }
  };

  const getCryptoSearchData = async (searchQuery) => {
    try {
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
        error,
        lastPage,
      }}
    >
      {props.children}
    </CryptoDataContext.Provider>
  );
};

export { CryptoProvider, CryptoDataContext };
