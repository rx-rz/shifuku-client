import { Link } from "react-router-dom";

type LinkProps = {
  to: string;
  className?: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
};

const variants = {
  room: "xl:text-3xl font-medium  text-right font-boska border border-secondary h-fit rounded-full xl:p-4 md:text-xl text-lg hover:text-white md:p-2 p-1 transition-colors duration-300 hover:bg-secondary",
};

export const LinkTo = ({ to, className, children, variant }: LinkProps) => {
  if (variant) {
    return (
      <Link className={className + " " + variants[variant!]} to={to}>
        {children}
      </Link>
    );
  } else {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }
};
