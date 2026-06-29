import Link from "next/link";
import * as types from "@/types/types";
import { extractIdFromUrl, formatDate } from "@/utils/common-functions";
import useFavouritesStore from "@/store/useFavouritesStore";

interface FilmCardProps {
  film: types.Film;
}

const FilmCard = ({ film }: FilmCardProps) => {
  // SWAPI doesn't return numeric IDs and extracted from the resource URL
  const id = extractIdFromUrl(film.url);
  const isFavourite = useFavouritesStore((state) =>
    state.isFavourite(film.url),
  );
  const addFavourite = useFavouritesStore((state) => state.addFavourite);
  const removeFavourite = useFavouritesStore((state) => state.removeFavourite);

  const handleFavourite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavourite) {
      removeFavourite(film.url);
    } else {
      addFavourite({
        id,
        type: "film",
        name: film.title,
        url: film.url,
      });
    }
  };

  return (
    <Link href={`/detail?type=film&id=${id}`}>
      <div
        className="
          relative bg-slate-900/60 backdrop-blur-md
          border border-white/10 rounded-2xl p-6
          hover:border-red-500/40
          hover:shadow-[0_0_25px_rgba(239,68,68,0.1)]
          transition-all duration-300 cursor-pointer group
          overflow-hidden h-full
        "
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/0 to-transparent group-hover:via-red-500/40 transition-all duration-500" />
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-red-500/60 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Episode {film.episode_id}
          </span>

          <button
            onClick={handleFavourite}
            className={`
              text-lg transition-all duration-200
              ${isFavourite ? "text-red-500" : "text-white/20 hover:text-red-500/60"}
            `}
          >
            ★
          </button>
        </div>

        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-red-400 transition-colors duration-300">
          {film.title}
        </h3>

        <div className="space-y-2 mb-4">
          {[
            { label: "Director", value: film.director },
            { label: "Producer", value: film.producer },
            { label: "Release", value: formatDate(film.release_date) },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-white/40 text-xs tracking-wide">
                {label}
              </span>
              <span className="text-white/80 text-xs">{value}</span>
            </div>
          ))}
        </div>

        <p className="text-white/20 text-xs leading-relaxed line-clamp-2">
          {film.opening_crawl}
        </p>

        <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
          <span className="text-white/20 group-hover:text-red-500 text-sm transition-all duration-300 group-hover:translate-x-1 transform">
            View details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FilmCard;
