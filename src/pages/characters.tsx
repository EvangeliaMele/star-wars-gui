import * as types from "@/types/types";
import { useEffect, useState, useCallback } from "react";
import { Layout, PageTitle, Loading, Alert, Input } from "@/Components/Common";
import CharacterCard from "@/Components/Characters/CharacterCard";
import Pagination from "@/Components/Characters/Pagination";
import useCharactersStore from "@/store/useCharactersStore";
import * as apiFunctions from "@/utils/api-functions";
import { debounce, calculateTotalPages } from "@/utils/common-functions";
import { ITEMS_PER_PAGE } from "@/utils/common-variables";
import { trackEvent } from "@/utils/tracking";

const Characters = () => {
  const [characters, setCharacters] = useState<types.Character[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const search = useCharactersStore((state) => state.search);
  const currentPage = useCharactersStore((state) => state.currentPage);
  const setSearch = useCharactersStore((state) => state.setSearch);
  const setCurrentPage = useCharactersStore((state) => state.setCurrentPage);

  const totalPages = calculateTotalPages(totalCount, ITEMS_PER_PAGE);

  const fetchCharacters = useCallback(
    async (page: number, searchTerm: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await apiFunctions.getCharacters(page, searchTerm);
        setCharacters(data.results);
        setTotalCount(data.count);
      } catch {
        setError("Failed to load characters. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  // Wait for user to stop typing before searching and it prevents too many API calls
  const debouncedFetch = useCallback(
    debounce((page: number, searchTerm: string) => {
      fetchCharacters(page, searchTerm);
    }, 400),
    [fetchCharacters],
  );

  // Track page visit
  useEffect(() => {
  trackEvent("page_visited", { page: "characters" });
}, []);

  useEffect(() => {
    debouncedFetch(currentPage, search);
  }, [currentPage, search, debouncedFetch]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout backgroundImage="/images/empty-favourites.jpg">
      <PageTitle title="Characters" />
      <div className="pt-8">
        <div className="flex justify-center w-full">
          <div className="mt-2 w-full max-w-7xl bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Characters</h1>
                <p className="text-white/40 text-sm mt-1">
                  {totalCount} characters in the galaxy
                </p>
              </div>
              <div className="w-full sm:w-72">
                <Input
                  value={search}
                  onValueChange={handleSearchChange}
                  placeholder="Search characters..."
                />
              </div>
            </div>

            {error && (
              <Alert
                type="error"
                message={error}
                onClose={() => setError(null)}
              />
            )}

            {isLoading ? (
              <Loading text="Loading galaxy data..." />
            ) : characters.length === 0 ? (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <p className="text-white/40 text-sm">
                  No characters found for &quot;{search}&quot;. Even Vader
                  couldn&apos;t find them!
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {characters.map((character) => (
                    <CharacterCard key={character.url} character={character} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Characters;
