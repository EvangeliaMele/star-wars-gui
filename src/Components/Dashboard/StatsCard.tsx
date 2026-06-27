import Link from "next/link";
import * as types from "@/types/types";

type CardVariant = "row" | "banner";

interface StatsCardProps extends types.StatsCardProps {
  variant?: CardVariant;
  backgroundImage?: string;
}

const StatsCard = ({
  title,
  count,
  description,
  href,
  variant = "row",
  backgroundImage,
}: StatsCardProps) => {
  if (variant === "banner") {
    return (
      <Link href={href}>
        <div className="relative overflow-hidden rounded-2xl h-32 cursor-pointer group">
          {backgroundImage && (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 z-10 transition-all duration-300" />
            </>
          )}

          <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 z-20" />
          <div className="relative z-20 flex items-center justify-between h-full px-8">
            <div>
              <p className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-1">
                {title}
              </p>
              <p className="text-white text-sm">{description}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors duration-300">
                {count}
              </p>
              <span className="text-white/20 group-hover:text-red-500 text-2xl transition-all duration-300 group-hover:translate-x-1 transform">
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  return (
    <Link href={href}>
      <div className="flex items-center justify-between py-5 px-6 cursor-pointer group border-l-2 border-red-500/30 hover:border-red-500 transition-all duration-300">
        <div>
          <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-1">
            {title}
          </p>
          <p className="text-white/60 text-sm">{description}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-5xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
            {count}
          </p>
          <span className="text-white/20 group-hover:text-red-500 text-2xl transition-all duration-300 group-hover:translate-x-1 transform">
            →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default StatsCard;
