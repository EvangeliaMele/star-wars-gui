/* SWAPI Pagination Response */
export type SwapiListResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

/* Character */
export type Character = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

export type CharacterListResponse = SwapiListResponse<Character>;

/* Film */
export type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
};

export type FilmListResponse = SwapiListResponse<Film>;

/* Favourites */
export type FavouriteType = "character" | "film";

export type Favourite = {
  id: string;
  type: FavouriteType;
  name: string;
  url: string;
};

/* Pagination */
export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

/* Component Props */
export interface CharacterCardProps {
  character: Character;
  isFavourite: boolean;
  onToggleFavourite: (character: Character) => void;
}

export interface FilmCardProps {
  film: Film;
  isFavourite: boolean;
  onToggleFavourite: (film: Film) => void;
}

export interface DetailViewProps {
  title: string;
  data: Record<string, string | number | string[]>;
  type: FavouriteType;
  url: string;
  isFavourite: boolean;
  onToggleFavourite: () => void;
}

export interface StatsCardProps {
  title: string;
  count: number;
  description: string;
  href: string;
}

/* Store Types */
export interface FavouritesStore {
  favourites: Favourite[];
  addFavourite: (item: Favourite) => void;
  removeFavourite: (url: string) => void;
  isFavourite: (url: string) => boolean;
}

export interface CharactersStore {
  search: string;
  currentPage: number;
  setSearch: (search: string) => void;
  setCurrentPage: (page: number) => void;
  reset: () => void;
}

export interface FilmsStore {
  search: string;
  currentPage: number;
  setSearch: (search: string) => void;
  setCurrentPage: (page: number) => void;
  reset: () => void;
}

/* Common */
export type Option = {
  label: string;
  value: string;
};

export type AlertType = "success" | "error" | "warning" | "info";

export interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
}

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  className?: string;
}

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export interface PageTitleProps {
  title: string;
}

export interface LoadingProps {
  message?: string;
}
