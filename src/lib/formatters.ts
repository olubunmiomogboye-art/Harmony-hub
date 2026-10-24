/**
 * Utility formatters for Nigerian Naira (₦) and strings
 */

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("NGN", "₦")
    .trim();
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("en-NG").format(amount);
}
