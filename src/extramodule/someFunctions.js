export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const currencies = [
  { currency: "btc", country: "Bitcoin (Cryptocurrency)" },
  { currency: "eth", country: "Ethereum (Cryptocurrency)" },
  { currency: "usd", country: "United States" },
  { currency: "aud", country: "Australia" },
  { currency: "eur", country: "Eurozone countries" },
  { currency: "gbp", country: "United Kingdom" },
  { currency: "hkd", country: "Hong Kong" },
  { currency: "inr", country: "India" },
  { currency: "jpy", country: "Japan" },
  { currency: "krw", country: "South Korea" },
  { currency: "nzd", country: "New Zealand" },
  { currency: "pkr", country: "Pakistan" },
  { currency: "pln", country: "Poland" },
  { currency: "rub", country: "Russia" },
  { currency: "aed", country: "United Arab Emirates" },
  { currency: "bdt", country: "Bangladesh" },
  { currency: "cad", country: "Canada" },
  { currency: "chf", country: "Switzerland" },
  { currency: "brl", country: "Brazil" },
  { currency: "cny", country: "China" },
  { currency: "zar", country: "South Africa" },
  { currency: "uah", country: "Ukraine" },
  { currency: "lkr", country: "Sri Lanka" },
  { currency: "twd", country: "Taiwan" },
  { currency: "ils", country: "Israel" },
];
