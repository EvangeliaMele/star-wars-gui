import { useEffect, useState } from "react";
import { Layout, PageTitle, Loading, Alert } from "@/Components/Common";
import StatsCard from "@/Components/Dashboard/StatsCard";
import Image from "next/image";
import useFavouritesStore from "@/store/useFavouritesStore";
import * as apiFunctions from "@/utils/api-functions";
import WelcomeModal from "@/Components/Dashboard/WelcomeModal";
import { trackEvent } from "@/utils/tracking";

const Dashboard = () => {
  // Fetch only counts on mount because full data loads on respective pages
  const [charactersCount, setCharactersCount] = useState(0);
  const [filmsCount, setFilmsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const favourites = useFavouritesStore((state) => state.favourites);

  // Track page visit
  useEffect(() => {
  trackEvent("page_visited", { page: "dashboard" });
}, []);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch characters and films counts at the same time and it's faster than one by one
        const [charactersData, filmsData] = await Promise.all([
          apiFunctions.getCharacters(1),
          apiFunctions.getFilms(1),
        ]);
        setCharactersCount(charactersData.count);
        setFilmsCount(filmsData.count);
        console.log(
          "characters:",
          charactersData.count,
          "films:",
          filmsData.count,
        );
      } catch (err) {
        console.log("API Error:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <Layout>
      <PageTitle title="Star Wars" />
      <WelcomeModal />

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      <div className="pt-8 max-w-7xl mx-auto">
        <div className="relative mb-10 py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-0" />

          <div className="relative z-20 px-8 py-10">
            <p className="text-red-500 text-sm font-semibold tracking-widest uppercase mb-2">
              A long time ago in a galaxy far, far away...
            </p>
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              Welcome to the
              <br />
              <span className="text-red-500">Star Wars</span> Universe of Mele
            </h1>
            <p className="text-white/50 text-sm max-w-md">
              Explore characters and films from the Star Wars. Mark your
              favourites and dive deep into the galaxy. Ready?
            </p>
          </div>

          <div className="absolute right-0 bottom-0 z-20 h-full flex items-end">
            <Image
              src="/images/darth-vader-404.png"
              alt="Darth Vader"
              width={260}
              height={260}
              className="object-contain opacity-80"
            />
          </div>
        </div>

        <h2 className="text-white/60 text-sm font-medium tracking-widest uppercase mb-4">
          Let&apos;s explore the Galaxy
        </h2>

        {isLoading ? (
          <Loading text="Loading galaxy data..." />
        ) : (
          <div className="flex flex-col divide-y divide-white/5">
            <StatsCard
              title="Characters"
              count={charactersCount}
              description="Heroes, villains and everything in between"
              href="/characters"
              variant="row"
            />
            <StatsCard
              title="Films"
              count={filmsCount}
              description="The complete Star Wars film"
              href="/films"
              variant="row"
            />
            <StatsCard
              title="Favourites"
              count={favourites.length}
              description="Your personally saved items"
              href="/favourites"
              variant="row"
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
