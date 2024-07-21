import React, { useLayoutEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const currencyFormat = (num, currency, notation = "standard") => {
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

function CustomTooltip({ payload, label, active, currency }) {
  if (active) {
    return (
      <div className="custom-tool text-sm bg-gray-300 bg-opacity-15 px-1">
        <p>{payload[0]?.payload?.date}</p>
        <p>price: {currencyFormat(payload[0]?.value, currency)}</p>
      </div>
    );
  }
  return null;
}
export const Chart = ({ coinId, currency }) => {
  const [chartData, setChartData] = useState({});
  const [days, setDays] = useState(7);
  const [chartServerError, setChartServerError] = useState(false);

  useLayoutEffect(() => {
    async function getChartData(id, day = 7) {
      try {
        const data = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=${day}&interval=daily&x_cg_demo_api_key=${process.env.REACT_APP_COIN_API}`
        )
          .then((res) => {
            if (res.status !== 200) setChartServerError(true);
            else setChartServerError(false);
            return res.json();
          })
          .then((data) => data);

        // const data = {
        //   prices: [
        //     [1720137600000, 4774933.631564784],
        //     [1720224000000, 4736204.016870394],
        //     [1720310400000, 4860629.530942648],
        //     [1720396800000, 4664466.251656322],
        //     [1720483200000, 4729145.262383231],
        //     [1720569600000, 4841632.154163521],
        //     [1720656000000, 4818078.72957386],
        //     [1720742400000, 4792989.928454823],
        //     [1720828800000, 4835646.479384346],
        //     [1720915200000, 4940330.757082093],
        //     [1721001600000, 5089935.938871697],
        //     [1721088000000, 5419458.34763521],
        //     [1721174400000, 5442992.536607422],
        //     [1721260800000, 5360092.44096616],
        //     [1721347200000, 5352731.5585890645],
        //     [1721369112000, 5365413.897348233],
        //   ],
        //   market_caps: [
        //     [1720137600000, 94359114339945.39],
        //     [1720224000000, 93362932559998.17],
        //     [1720310400000, 95757389446578.92],
        //     [1720396800000, 91857321507842.67],
        //     [1720483200000, 93274797483807.14],
        //     [1720569600000, 95582730986193.12],
        //     [1720656000000, 95131842057528.14],
        //     [1720742400000, 94387088637078.45],
        //     [1720828800000, 95341693469075.17],
        //     [1720915200000, 97580350703017.7],
        //     [1721001600000, 100563668276826.44],
        //     [1721088000000, 106809122717765.16],
        //     [1721174400000, 107330020069123.95],
        //     [1721260800000, 105805351758306.05],
        //     [1721347200000, 105570394157018.02],
        //     [1721369112000, 105785920348630.92],
        //   ],
        //   total_volumes: [
        //     [1720137600000, 3599579249698.5645],
        //     [1720224000000, 5015126100530.715],
        //     [1720310400000, 1777450885417.4521],
        //     [1720396800000, 1687136011441.4788],
        //     [1720483200000, 3473033167295.096],
        //     [1720569600000, 2372365177338.4614],
        //     [1720656000000, 2169869252520.8271],
        //     [1720742400000, 2438467925160.863],
        //     [1720828800000, 2130089372306.9536],
        //     [1720915200000, 1400228960561.7214],
        //     [1721001600000, 1778613313170.9585],
        //     [1721088000000, 3160461842140.2236],
        //     [1721174400000, 3417577622505.1045],
        //     [1721260800000, 2796321513678.348],
        //     [1721347200000, 2173925716348.5103],
        //     [1721369112000, 2219273567444.8887],
        //   ],
        // };
        // console.log("chartdata", data);
        const options = { day: "2-digit", month: "short", year: "numeric" };

        let mappedData = data?.prices.map((item) => ({
          date: new Date(item[0]).toLocaleDateString("en-GB", options),
          prices: item[1],
        }));
        // console.log(mappedData);
        setChartData(mappedData);
      } catch (error) {
        // console.log(error);
        setChartData([]);
      } finally {
      }
    }

    getChartData(coinId, days);
  }, [coinId, currency, days]);

  return (
    <>
      {chartServerError && (
        <div className="text-red text-md animate-bounce">
          Server Error try later
        </div>
      )}
      <div className="w-full h-[95%] md:h-[60%] my-4 flex flex-col">
        <ResponsiveContainer height={"90%"}>
          <LineChart data={chartData}>
            <Line type="monotone" dataKey="prices" stroke="#212121" />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip content={<CustomTooltip />} currency={currency} />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex row justify-center gap-3">
          <button
            className={`px-2 py-1 bg-gray-300 rounded-sm active:bg-white  ${
              days === 7 ? "bg-opacity-55" : "bg-opacity-15"
            }`}
            // style={{ backgroundColor: days === 7 ? "rgba(33,33,33,0.5)" : "" }}
            onClick={() => setDays(7)}
          >
            7 days
          </button>
          <button
            className={`px-2 py-1 bg-gray-300 rounded-sm active:bg-white  ${
              days === 15 ? "bg-opacity-55" : "bg-opacity-15"
            }`} // style={{ backgroundColor: days === 15 ? "rgba(33,33,33,0.5)" : "" }}
            onClick={() => setDays(15)}
          >
            15 days
          </button>{" "}
          <button
            className={`px-2 py-1 bg-gray-300 rounded-sm active:bg-white  ${
              days === 30 ? "bg-opacity-55" : "bg-opacity-15"
            }`} // style={{ backgroundColor: days === 30 ? "rgba(33,33,33,0.5)" : "" }}
            onClick={() => setDays(30)}
          >
            30 days
          </button>
          <button
            className={`px-2 py-1 bg-gray-300 rounded-sm active:bg-white  ${
              days === 180 ? "bg-opacity-55" : "bg-opacity-15"
            }`} // style={{ backgroundColor: days === 30 ? "rgba(33,33,33,0.5)" : "" }}
            onClick={() => setDays(180)}
          >
            6 months
          </button>
          <button
            className={`px-2 py-1 bg-gray-300 rounded-sm active:bg-white  ${
              days === 365 ? "bg-opacity-55" : "bg-opacity-15"
            }`} // style={{ backgroundColor: days === 30 ? "rgba(33,33,33,0.5)" : "" }}
            onClick={() => setDays(365)}
          >
            1 year
          </button>
        </div>
      </div>{" "}
    </>
  );
};
