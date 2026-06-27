import Link from "next/link";
import * as types from "@/types/types";
import { extractIdFromUrl } from "@/utils/common-functions";
import useFavouritesStore from "@/store/useFavouritesStore";

interface CharacterCardProps {
  character: types.Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  // SWAPI doesn't return numeric IDs and extracted from the resource URL
  const id = extractIdFromUrl(character.url);
  const isFavourite = useFavouritesStore((state) =>
    state.isFavourite(character.url),
  );
  const addFavourite = useFavouritesStore((state) => state.addFavourite);
  const removeFavourite = useFavouritesStore((state) => state.removeFavourite);

  const handleFavourite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavourite) {
      removeFavourite(character.url);
    } else {
      addFavourite({
        id,
        type: "character",
        name: character.name,
        url: character.url,
      });
    }
  };

  return (
    <Link href={`/detail?type=character&id=${id}`}>
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
        <button
          onClick={handleFavourite}
          className={`
            absolute top-4 right-4 text-lg transition-all duration-200
            ${isFavourite ? "text-red-500" : "text-white/20 hover:text-red-500/60"}
          `}
        >
          ★
        </button>

        <h3 className="text-white font-bold text-lg mb-4 pr-8 group-hover:text-red-400 transition-colors duration-300">
          {character.name}
        </h3>

        <div className="space-y-2">
          {[
            { label: "Birth Year", value: character.birth_year },
            { label: "Gender", value: character.gender },
            {
              label: "Height",
              value:
                character.height !== "unknown"
                  ? `${character.height} cm`
                  : "unknown",
            },
            { label: "Eye Color", value: character.eye_color },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-white/40 text-xs tracking-wide">
                {label}
              </span>
              <span className="text-white/80 text-xs capitalize">{value}</span>
            </div>
          ))}
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

export default CharacterCard;
