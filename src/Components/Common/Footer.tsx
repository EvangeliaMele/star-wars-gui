import React from "react";

const Footer = () => {
  return (
    <footer
      className="mt-auto border-t border-white/10 py-3 relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/stars-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70 md z-0" />
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/40 font-medium tracking-wide">
            © {new Date().getFullYear()}
          </span>
          <span className="text-sm text-white/60 font-semibold tracking-wide">
            Star Wars
          </span>
        </div>

        <div className="hidden sm:block w-px h-4 bg-white/20" />
        <div className="flex items-center gap-4">
          <a className="text-sm text-white/40 font-medium">Powered by SWAPI</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
