export const CURRENCY_SYMBOLS = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "CA$",
  AUD: "A$",
  JPY: "¥",
};

export function formatCurrency(amount, currencyCode = "INR") {
  const numericAmount = Number(amount) || 0;
  const currency = (currencyCode || "INR").toUpperCase();

  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(numericAmount);
  } catch {
    const symbol = CURRENCY_SYMBOLS[currency] || "₹";
    return `${symbol}${numericAmount.toLocaleString()}`;
  }
}

export function getCurrencySymbol(currencyCode = "INR") {
  const currency = (currencyCode || "INR").toUpperCase();
  return CURRENCY_SYMBOLS[currency] || "₹";
}
