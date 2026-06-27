import * as types from "@/types/types";

const endpoints = {
  characters: `https://swapi.info/api/people`,
  films: `https://swapi.info/api/films`,
};

/* CHARACTERS */
export const getCharacters = async (
  page: number = 1,
  search: string = "",
): Promise<types.CharacterListResponse> => {
  const response = await fetch(endpoints.characters, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data: types.Character[] = await response.json();
  const filtered = search
    ? data.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    : data;
  const ITEMS_PER_PAGE = 10;
  const start = (page - 1) * ITEMS_PER_PAGE;
  const results = filtered.slice(start, start + ITEMS_PER_PAGE);
  return {
    count: filtered.length,
    next: start + ITEMS_PER_PAGE < filtered.length ? "next" : null,
    previous: page > 1 ? "prev" : null,
    results,
  };
};

export const getCharacterByUrl = async (
  url: string,
): Promise<types.Character> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

/* FILMS */
export const getFilms = async (
  page: number = 1,
  search: string = "",
): Promise<types.FilmListResponse> => {
  const response = await fetch(endpoints.films, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const raw = await response.json();
  const data: types.Film[] = Array.isArray(raw)
    ? raw
    : (raw.result ?? raw.results ?? []);
  const filtered = search
    ? data.filter((f) => f.title.toLowerCase().includes(search.toLowerCase()))
    : data;
  const ITEMS_PER_PAGE = 10;
  const start = (page - 1) * ITEMS_PER_PAGE;
  const results = filtered.slice(start, start + ITEMS_PER_PAGE);
  return {
    count: filtered.length,
    next: start + ITEMS_PER_PAGE < filtered.length ? "next" : null,
    previous: page > 1 ? "prev" : null,
    results,
  };
};

export const getFilmByUrl = async (url: string): Promise<types.Film> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
