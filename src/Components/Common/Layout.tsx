import React, { ReactNode } from "react";
import { Navbar, Footer } from "@/Components/Common";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
  showBackground?: boolean;
  showNavbar?: boolean;
  showFooter?: boolean;
  backgroundImage?: string;
}

const Layout = ({
  children,
  showBackground = true,
  showNavbar = true,
  showFooter = true,
  backgroundImage = "/images/bg.jpg",
}: LayoutProps) => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="relative min-h-screen flex flex-col w-full mx-auto overflow-hidden">
      {showBackground && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
        </>
      )}

      <div className="relative z-20 flex flex-col flex-grow">
        {showNavbar && (
          <Navbar
            logo={
              <div className="flex-shrink-0 flex items-center gap-3">
                <div className="w-10">
                  <Logo />
                </div>
                <span className="text-white font-bold text-sm tracking-widest uppercase">
                  Star Wars
                </span>
              </div>
            }
          />
        )}

        <main
          className={`flex-grow ${showBackground ? "px-6" : ""} ${showNavbar ? "pt-20 pb-2" : "pt-4"}`}
        >
          {children}
        </main>

        {showFooter && <Footer />}
      </div>
    </div>
  );
};

export default Layout;
