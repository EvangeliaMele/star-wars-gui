export const SWAPI_URL =
  process.env.NEXT_PUBLIC_SWAPI_URL || "https://swapi.dev/api";

export const ITEMS_PER_PAGE = 10;

export const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Characters", href: "/characters" },
  { label: "Films", href: "/films" },
  { label: "Favourites", href: "/favourites" },
];

export const RESOURCE_LABELS: Record<string, string> = {
  character: "Character",
  film: "Film",
};
