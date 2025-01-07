import { format, parseISO } from "date-fns";

export const formatDate = (date: string | Date) => {
  try {
    const parsedDate = typeof date === "string" ? parseISO(date) : date;
    return format(parsedDate, "MMM dd, yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};
