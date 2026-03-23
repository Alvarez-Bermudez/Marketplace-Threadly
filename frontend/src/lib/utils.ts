/**
 * Format isoString to en-US date string. Includes weekday, year, month, day
 * @param ISOString
 * @returns Date string or empty string if isoString is undefined
 */
export function formatDateUS(ISOString: string | undefined): string {
  if (!ISOString) return ""

  const date = new Date(ISOString)

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long", // e.g. "Sunday"
    year: "numeric", // e.g. "2026"
    month: "long", // e.g. "March"
    day: "numeric", // e.g. "15"
  }).format(date)
}

export function formatDateShort(ISOString: string | undefined): string {
  if (!ISOString) return ""

  const date = new Date(ISOString)

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric", // e.g. "2026"
    month: "long", // e.g. "March"
    day: "numeric", // e.g. "15"
  }).format(date)
}

export function formatCurrencyUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2, // always show cents
    maximumFractionDigits: 2, // limit to 2 decimals
  }).format(amount)
}

export function formatNumberUS(number: number): string {
  return new Intl.NumberFormat("en-US").format(number)
}
