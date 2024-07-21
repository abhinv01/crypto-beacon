import { createContext, useContext, useLayoutEffect, useState } from "react";
import { CryptoDataContext } from "./CryptoData";

const StorageContext = createContext({});

const StorageProvider = (props) => {
  const [savedCrypto, setSavedCrypto] = useState([]);
  const [savedCoinsData, setSavedCoinsData] = useState([]);
  const [storageLoading, setStorageLoading] = useState(false);
  const [errorSaved, setErrorSaved] = useState({ error: "" });
  let { filterData } = useContext(CryptoDataContext);

  const getSavedCryptoData = async (
    totalCoins = savedCrypto,
    currency,
    sortBy
  ) => {
    try {
      setStorageLoading(true);
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(
          ","
        )}&order=${sortBy}&sparkline=false&price_change_percentage=1y%2C7d%2C24h%2C1h&x_cg_demo_api_key=${
          process.env.REACT_APP_COIN_API
        }`
      )
        .then((res) => res.json())
        .then((data) => data);
      // console.log(data);
      if (data.error) setErrorSaved((prev) => ({ ...prev, ...data }));
      else setErrorSaved({ error: "" });
      setSavedCoinsData(data);
    } catch (error) {
      console.log(error);
      setSavedCoinsData([]);
    } finally {
      setStorageLoading(false);
    }
  };
  useLayoutEffect(() => {
    const coinsPresent = JSON.parse(localStorage.getItem("cryptoCoins"));
    if (coinsPresent?.length > 0) {
      setSavedCrypto(coinsPresent);
      getSavedCryptoData(coinsPresent, filterData.currency, filterData.sortBy);
    } else {
      JSON.stringify(localStorage.setItem("cryptoCoins", "[]"));
    }
  }, [filterData.currency, filterData.sortBy]);

  const resetStorage = () => {
    const coinsPresent = JSON.parse(localStorage.getItem("cryptoCoins"));
    if (coinsPresent?.length > 0) {
      setSavedCrypto(coinsPresent);
      getSavedCryptoData(coinsPresent, filterData.currency, filterData.sortBy);
    } else {
      setSavedCoinsData([]);
    }
  };
  return (
    <StorageContext.Provider
      value={{
        savedCrypto,
        setSavedCrypto,
        storageLoading,
        savedCoinsData,
        errorSaved,
        resetStorage,
      }}
    >
      {props.children}
    </StorageContext.Provider>
  );
};

export { StorageProvider, StorageContext };
