import * as types from "@/types/types";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: types.PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg text-sm border border-white/10 text-white/60
          hover:border-red-500/40 hover:text-white disabled:opacity-30
          disabled:cursor-not-allowed transition-all duration-200"
      >
        ← Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`
            w-9 h-9 rounded-lg text-sm border transition-all duration-200
            ${
              currentPage === page
                ? "bg-red-500/20 border-red-500/60 text-red-400 font-semibold"
                : "border-white/10 text-white/40 hover:border-red-500/30 hover:text-white"
            }
          `}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg text-sm border border-white/10 text-white/60
          hover:border-red-500/40 hover:text-white disabled:opacity-30
          disabled:cursor-not-allowed transition-all duration-200"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
