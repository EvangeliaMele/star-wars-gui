import * as types from "@/types/types";

const API_URL =
  process.env.NEXT_PUBLIC_SWAPI_URL || "https://swapi.dev/api";

const endpoints = {
  characters: `${API_URL}/people`,
  films: `${API_URL}/films`,
};

/* CHARACTERS */
export const getCharacters = async (
  page: number = 1,
  search: string = ""
): Promise<types.CharacterListResponse> => {
  const url = search
    ? `${endpoints.characters}/?page=${page}&search=${encodeURIComponent(search)}`
    : `${endpoints.characters}/?page=${page}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const getCharacterByUrl = async (
  url: string
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
  search: string = ""
): Promise<types.FilmListResponse> => {
  const url = search
    ? `${endpoints.films}/?page=${page}&search=${encodeURIComponent(search)}`
    : `${endpoints.films}/?page=${page}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
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
