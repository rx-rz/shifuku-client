import { Link, NavLink, useLocation } from "react-router-dom";

type LinkProps = {
  to: string;
  className?: string;
  children: React.ReactNode;
};

export const NavLinkTo = ({ to, className, children }: LinkProps) => {
  const location = useLocation();
  if (location.pathname === to) {
    return (
      <NavLink
        className={
          className + " border bg-white text-secondary p-2 border-white"
        }
        to={to}
      >
        {children}
      </NavLink>
    );
  } else {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }
};
