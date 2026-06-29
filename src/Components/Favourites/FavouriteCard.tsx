import Link from "next/link";
import * as types from "@/types/types";
import useFavouritesStore from "@/store/useFavouritesStore";

interface FavouriteCardProps {
  favourite: types.Favourite;
}

const FavouriteCard = ({ favourite }: FavouriteCardProps) => {
  const removeFavourite = useFavouritesStore((state) => state.removeFavourite);

  return (
    <Link href={`/detail?type=${favourite.type}&id=${favourite.id}`}>
      <div
        className="
          relative bg-slate-900/60 backdrop-blur-md
          border border-white/10 rounded-2xl p-6
          hover:border-red-500/40
          hover:shadow-[0_0_25px_rgba(239,68,68,0.1)]
          transition-all duration-300 cursor-pointer group
          overflow-hidden
        "
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/0 to-transparent group-hover:via-red-500/40 transition-all duration-500" />

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <span
              className={`
              text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border
              ${
                favourite.type === "character"
                  ? "text-red-400/80 bg-red-500/10 border-red-500/20"
                  : "text-blue-400/80 bg-blue-500/10 border-blue-500/20"
              }
            `}
            >
              {favourite.type}
            </span>
            <h3 className="text-white font-bold text-lg mt-3 group-hover:text-red-400 transition-colors duration-300">
              {favourite.name}
            </h3>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              removeFavourite(favourite.url);
            }}
            className="text-white/20 hover:text-red-500 text-lg transition-all duration-200 flex-shrink-0"
          >
            ★
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
          <span className="text-white/20 group-hover:text-red-500 text-sm transition-all duration-300 group-hover:translate-x-1 transform">
            View details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FavouriteCard;
