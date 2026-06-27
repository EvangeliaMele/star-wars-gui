import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        px-4 py-2 rounded-lg
        text-sm font-semibold tracking-wide
        transition-all duration-200
        ${
          isActive
            ? "bg-red-500/15 text-red-400"
            : "text-white/70 hover:text-white hover:bg-white/10"
        }
      `}
    >
      {children}
    </Link>
  );
};

export default NavLink;
