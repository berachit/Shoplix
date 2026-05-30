export const formatPrice = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "INR" }).format(n);
