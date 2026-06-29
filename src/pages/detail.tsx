import * as types from "@/types/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Layout, PageTitle, Loading, Alert } from "@/Components/Common";
import useFavouritesStore from "@/store/useFavouritesStore";
import * as apiFunctions from "@/utils/api-functions";
import { capitalize, formatDate } from "@/utils/common-functions";
import { trackEvent } from "@/utils/tracking";

const DetailPage = () => {
  const router = useRouter();
  const { type, id } = router.query as { type: string; id: string };

  const [data, setData] = useState<types.Character | types.Film | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isFavourite = useFavouritesStore((state) =>
    data ? state.isFavourite(data.url) : false,
  );
  const addFavourite = useFavouritesStore((state) => state.addFavourite);
  const removeFavourite = useFavouritesStore((state) => state.removeFavourite);

  // Track page visit
  useEffect(() => {
  if (!type || !id) return;
  trackEvent("page_visited", { page: `detail_${type}_${id}` });
}, [type, id]);

  useEffect(() => {
    if (!router.isReady || !type || !id) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Build URL based on type because SWAPI uses people instead of characters
        const url =
          type === "character"
            ? `https://swapi.info/api/people/${id}`
            : `https://swapi.info/api/films/${id}`;

        if (type === "character") {
          const result = await apiFunctions.getCharacterByUrl(url);
          setData(result);
        } else {
          const result = await apiFunctions.getFilmByUrl(url);
          setData(result);
        }
      } catch {
        setError("Failed to load details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router.isReady, type, id]);

  const handleFavourite = () => {
    if (!data) return;
    if (isFavourite) {
      removeFavourite(data.url);
    } else {
      addFavourite({
        id: String(id),
        type: type as types.FavouriteType,
        name:
          type === "character"
            ? (data as types.Character).name
            : (data as types.Film).title,
        url: data.url,
      });
    }
  };

  const getTitle = () => {
    if (!data) return "";
    return type === "character"
      ? (data as types.Character).name
      : (data as types.Film).title;
  };

  // Map raw SWAPI fields to human readable labels for better display
  const getFields = (): Record<string, string> => {
    if (!data) return {};
    if (type === "character") {
      const c = data as types.Character;
      return {
        "Birth Year": c.birth_year,
        Gender: capitalize(c.gender),
        Height: c.height !== "unknown" ? `${c.height} cm` : "unknown",
        Mass: c.mass !== "unknown" ? `${c.mass} kg` : "unknown",
        "Hair Color": capitalize(c.hair_color),
        "Skin Color": capitalize(c.skin_color),
        "Eye Color": capitalize(c.eye_color),
        Films: `${c.films.length} appearances`,
        Vehicles: `${c.vehicles.length} vehicles`,
        Starships: `${c.starships.length} starships`,
      };
    } else {
      const f = data as types.Film;
      return {
        Episode: `Episode ${f.episode_id}`,
        Director: f.director,
        Producer: f.producer,
        "Release Date": formatDate(f.release_date),
        Characters: `${f.characters.length} characters`,
        Planets: `${f.planets.length} planets`,
        Starships: `${f.starships.length} starships`,
        Vehicles: `${f.vehicles.length} vehicles`,
        Species: `${f.species.length} species`,
      };
    }
  };

  return (
    <Layout backgroundImage="/images/empty-favourites.jpg">
      <PageTitle title={`${getTitle()} | Star Wars GUI`} />
      <div className="pt-8">
        <div className="flex justify-center w-full">
          <div className="mt-2 w-full max-w-4xl bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <button
              onClick={() => router.back()}
              className="text-white/40 hover:text-white text-sm mb-6 flex items-center gap-2 transition-colors duration-200"
            >
              ← Back
            </button>

            {error && (
              <Alert
                type="error"
                message={error}
                onClose={() => setError(null)}
              />
            )}

            {isLoading ? (
              <Loading text="Loading galaxy data..." />
            ) : data ? (
              <>
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <span
                      className={`
                      text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border mb-3 inline-block
                      ${
                        type === "character"
                          ? "text-red-400/80 bg-red-500/10 border-red-500/20"
                          : "text-blue-400/80 bg-blue-500/10 border-blue-500/20"
                      }
                    `}
                    >
                      {type}
                    </span>
                    <h1 className="text-3xl font-bold text-white mt-2">
                      {getTitle()}
                    </h1>
                  </div>

                  <button
                    onClick={handleFavourite}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg border text-sm
                      transition-all duration-200
                      ${
                        isFavourite
                          ? "bg-red-500/20 border-red-500/40 text-red-400"
                          : "border-white/10 text-white/40 hover:border-red-500/40 hover:text-red-400"
                      }
                    `}
                  >
                    <span>{isFavourite ? "★" : "☆"}</span>
                    <span>{isFavourite ? "Saved" : "Save"}</span>
                  </button>
                </div>

                {/* Opening crawl for films */}
                {type === "film" && (
                  <div className="mb-8 p-4 bg-black/30 rounded-xl border border-white/5">
                    <p className="text-white/60 text-sm leading-relaxed italic">
                      {(data as types.Film).opening_crawl}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(getFields()).map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between items-center p-4 bg-black/20 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all duration-200"
                    >
                      <span className="text-white/40 text-xs tracking-wide uppercase">
                        {label}
                      </span>
                      <span className="text-white/80 text-sm font-medium">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailPage;
