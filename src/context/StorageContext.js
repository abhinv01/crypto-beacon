import { createContext, useLayoutEffect, useState } from "react";

const StorageContext = createContext({});

const StorageProvider = (props) => {
  const [savedCrypto, setSavedCrypto] = useState([]);
  const [storageLoading, setStorageLoading] = useState(false);

  useLayoutEffect(() => {
    setStorageLoading(true);
    const coinsPresent = JSON.parse(localStorage.getItem("cryptoCoins"));
    console.log(coinsPresent, coinsPresent);
    if (coinsPresent?.length > 0) {
      setSavedCrypto(coinsPresent);
    } else {
      JSON.stringify(localStorage.setItem("cryptoCoins", "[]"));
    }
    setStorageLoading(false);
  }, []);
  return (
    <StorageContext.Provider
      value={{
        savedCrypto,
        setSavedCrypto,
        storageLoading,
      }}
    >
      {props.children}
    </StorageContext.Provider>
  );
};

export { StorageProvider, StorageContext };
