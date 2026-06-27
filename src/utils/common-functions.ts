/* ID Extraction */
export const extractIdFromUrl = (url: string): string => {
  const parts = url.replace(/\/$/, "").split("/");
  return parts[parts.length - 1];
};

/* Debounce */
export const debounce = <T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/* Pagination */
export const calculateTotalPages = (
  total: number,
  itemsPerPage: number,
): number => {
  return Math.ceil(total / itemsPerPage);
};

/* Format Date */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/* Capitalize */
export const capitalize = (str: string): string => {
  if (!str) return "N/A";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
