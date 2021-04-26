export const CURRENCY_ENUM = Object.freeze({ USD: 1, CAD: 2 });

export const CAD_TO_USD_FIXED_RATE_IN_CENTS = 0.8;

export const USD_TO_CAD_FIXED_RATE_IN_CENTS = 1.245;

export function convertCurrency(currency, amountInCents) {
  switch (currency) {
    case CURRENCY_ENUM.CAD:
      return amountInCents * USD_TO_CAD_FIXED_RATE_IN_CENTS;
    default:
      return amountInCents;
  }
}

export function roundCurrencyToCents(amountInDollars) {
  return amountInDollars.toFixed(2);
}
