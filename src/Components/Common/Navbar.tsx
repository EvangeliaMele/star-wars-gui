import React from "react";
import NavLink from "./NavLink";
import { NAV_LINKS } from "@/utils/common-variables";

interface NavbarProps {
  logo: React.ReactNode;
}

const Navbar = ({ logo }: NavbarProps) => {
  return (
    // {/* <nav
    //   className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
    //   style={{
    //     backgroundImage: "url('/images/stars-bg.jpg')",
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //   }}
    // >  */}

    <nav
      className={`
    fixed top-0 left-0 right-0 z-50
    bg-slate-900/80 backdrop-blur-md
    border-b border-white/10
  `}
    >
      <div className="absolute inset-0 bg-black/30 md z-0" />
      <div className="relative z-10 flex items-center justify-between h-16 px-6">
        <div className="flex items-center">{logo}</div>

        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center space-x-2">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center space-x-2" />
      </div>
    </nav>
  );
};

export default Navbar;
