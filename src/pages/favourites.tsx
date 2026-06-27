import { Layout, PageTitle } from "@/Components/Common";
import FavouriteCard from "@/Components/Favourites/FavouriteCard";
import useFavouritesStore from "@/store/useFavouritesStore";
import * as types from "@/types/types";

const Favourites = () => {
  const favourites = useFavouritesStore((state) => state.favourites);

  return (
    <Layout>
      <PageTitle title="Favourites" />
      <div className="pt-8">
        <div className="flex justify-center w-full">
          <div className="mt-2 w-full max-w-7xl bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white">Favourites</h1>
              <p className="text-white/40 text-sm mt-1">
                {favourites.length} saved item
                {favourites.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Empty state */}
            {favourites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-6">
                <div className="text-center">
                  <p className="text-white/60 font-semibold text-lg">
                    Your galaxy feels empty...
                  </p>
                  <p className="text-white/30 text-sm mt-1">
                    Even Darth Vader had things he cared about. Start exploring!
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {favourites.map((favourite: types.Favourite) => (
                  <FavouriteCard key={favourite.url} favourite={favourite} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Favourites;
