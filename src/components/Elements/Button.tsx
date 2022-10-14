type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  handleClick?: () => void;
  loading?: boolean;
  type?: "submit";
};

const variants = {
  primary:
    "border-secondary text-lg text-white font-medium bg-secondary border w-fit mt-4 p-2 bg-primary disabled:opacity-80 transition-shadow duration-300 hover:shadow-xl shadow-black",
  secondary:
    "border-secondary border bg-white w-fit  px-2 md:p-2 hover:bg-secondary hover:text-white mt-2 transition-colors duration-300",
  tertiary:
    "border-b border-secondary w-full text-left p-2 font-bold opacity-80 bg-white",
  listsecondary:
    "bg-red-500  p-2 text-white hover:shadow-xl transition-shadow shadow-black duration-300",
  listprimary:
    "bg-secondary p-2 text-white hover:shadow-xl transition-shadow shadow-black duration-300",
};

export const Button = ({
  handleClick,
  children,
  className,
  type,
  variant,
  loading,
}: ButtonProps) => {
  if (className) {
    return (
      <button
        onClick={handleClick}
        className={variants[variant!] + " " + className}
        type={type}
        disabled={loading}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        onClick={handleClick}
        className={variants[variant!]}
        type={type}
        disabled={loading}
      >
        {children}
      </button>
    );
  }
};
