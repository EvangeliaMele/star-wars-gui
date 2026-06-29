import * as types from "@/types/types";
import { useEffect, useState, useCallback } from "react";
import { Layout, PageTitle, Loading, Alert, Input } from "@/Components/Common";
import FilmCard from "@/Components/Films/FilmCard";
import Pagination from "@/Components/Characters/Pagination";
import useFilmsStore from "@/store/useFilmsStore";
import * as apiFunctions from "@/utils/api-functions";
import { debounce, calculateTotalPages } from "@/utils/common-functions";
import { ITEMS_PER_PAGE } from "@/utils/common-variables";
import { trackEvent } from "@/utils/tracking";

const Films = () => {
  const [films, setFilms] = useState<types.Film[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const search = useFilmsStore((state) => state.search);
  const currentPage = useFilmsStore((state) => state.currentPage);
  const setSearch = useFilmsStore((state) => state.setSearch);
  const setCurrentPage = useFilmsStore((state) => state.setCurrentPage);

  const totalPages = calculateTotalPages(totalCount, ITEMS_PER_PAGE);

  const fetchFilms = useCallback(async (page: number, searchTerm: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiFunctions.getFilms(page, searchTerm);
      setFilms(data.results);
      setTotalCount(data.count);
    } catch {
      setError("Failed to load films. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Wait for user to stop typing before searching and it prevents too many API calls
  const debouncedFetch = useCallback(
    debounce((page: number, searchTerm: string) => {
      fetchFilms(page, searchTerm);
    }, 400),
    [fetchFilms],
  );

  // Track page visit
  useEffect(() => {
  trackEvent("page_visited", { page: "films" });
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
      <PageTitle title="Films" />
      <div className="pt-8">
        <div className="flex justify-center w-full">
          <div className="mt-2 w-full max-w-7xl bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Films</h1>
                <p className="text-white/40 text-sm mt-1">
                  {totalCount} films in the saga
                </p>
              </div>
              <div className="w-full sm:w-72">
                <Input
                  value={search}
                  onValueChange={handleSearchChange}
                  placeholder="Search films..."
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <Alert
                type="error"
                message={error}
                onClose={() => setError(null)}
              />
            )}

            {isLoading ? (
              <Loading text="Loading galaxy data..." />
            ) : films.length === 0 ? (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <p className="text-white/40 text-sm">
                  No films found for &quot;{search}&quot;. Have left us for
                  other galaxy mate!
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {films.map((film) => (
                    <FilmCard key={film.url} film={film} />
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

export default Films;
