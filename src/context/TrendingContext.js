import { createContext, useLayoutEffect, useState } from "react";

const TrendingContext = createContext({});

const TrendingProvider = (props) => {
  const [trendingCoin, setTrendingCoin] = useState({});
  const [trendLoading, settrendLoading] = useState(false);

  const getTrending = async () => {
    try {
      settrendLoading(true);
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search/trending`
      )
        .then((res) => res.json())
        .then((data) => data);
      console.log(data);
      setTrendingCoin(data.coins);
    } catch (error) {
      console.log(error);

      setTrendingCoin([]);
      settrendLoading(false);
    } finally {
      settrendLoading(false);
    }
  };

  useLayoutEffect(() => {
    getTrending();
  }, []);

  const resetTrending = () => {
    getTrending();
  };
  return (
    <TrendingContext.Provider
      value={{
        trendingCoin,
        trendLoading,
        resetTrending,
      }}
    >
      {props.children}
    </TrendingContext.Provider>
  );
};

export { TrendingProvider, TrendingContext };
