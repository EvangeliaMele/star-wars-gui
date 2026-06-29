import Link from "next/link";
import { NextPageWithDisableLayout } from "./_app";

const NotFound: NextPageWithDisableLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/404-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/70 z-10" />
      <div className="relative z-20 flex flex-col items-center text-center px-6 mt-10">
        <p className="text-red-500 text-sm font-semibold tracking-widest uppercase mb-3">
          Error 404
        </p>

        <h1 className="text-5xl font-bold text-white mb-4">
          This is not the page
          <br />
          <span className="text-red-500">you are looking for</span>
        </h1>

        <p className="text-white/40 text-sm max-w-md mb-8">
          The page you requested has been lost in a galaxy far, far away...
          Perhaps the Dark Vader took it, maybee?
        </p>

        <Link
          href="/dashboard"
          className="
            px-6 py-3 rounded-lg text-sm font-semibold
            bg-red-500 hover:bg-red-400
            text-white transition-all duration-200
            tracking-wide
          "
        >
          Return to Previous Galaxy
        </Link>
      </div>
    </div>
  );
};

NotFound.disableLayout = true;

export default NotFound;
