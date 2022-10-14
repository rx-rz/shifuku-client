import { Button } from "./Button";
import { LinkTo } from "./LinkTo";
import { NavLinkTo } from "./NavLinkTo";

export const Dashboard = () => {
  const handleLogOut = () => {
    localStorage.removeItem("user");
    window.location.pathname = "/";
  };

  const userlinks = [
    { name: "Overview", path: "/dashboard" },
    { name: "Bookings", path: "/dashboard/bookings" },
    { name: "Rooms", path: "/dashboard/rooms" },
  ];

  return (
    <nav className="font-general_sans font-medium  py-8 bg-secondary">
      <div className="w-10/12 mx-auto flex justify-between text-white">
        <div>
          <LinkTo to="/" className="text-2xl font-bold">
            至福
          </LinkTo>
        </div>
        <div className="hidden md:flex items-center">
          {userlinks.map((link) => (
            <NavLinkTo to={link.path} className="mx-4 text-xl" key={link.name}>
              {link.name}
            </NavLinkTo>
          ))}
        </div>
        <div className="hidden md:flex ">
          <Button handleClick={handleLogOut} className="text-xl">
            Log Out
          </Button>
        </div>
      </div>
    </nav>
  );
};
