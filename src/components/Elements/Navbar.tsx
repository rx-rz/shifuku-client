import { useLocation } from "react-router-dom";
import { Button } from "./Button";
import { LinkTo } from "./LinkTo";
import { useRef } from "react";
type UserAuthProps = {
  token: string;
  user: {
    createdAt: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNo: string;
    role: "customer" | "admin";
    updatedAt: string;
    __v: number;
    _id: string;
  };
};

export const Navbar = () => {
  const location = useLocation();
  const menu = useRef<HTMLDivElement>(null);

  /*hide or show the menu, */
  const handleMenuVisibility = () => {
    menu.current!.classList.toggle("hidden");
  };

  // Retrieve the "user" value from local storage, if it exists
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!) // parse the JSON string into an object
    : false; // if no user is found, assign `false`

  // If the current location pathname is "/booking"
  if (location.pathname === "/booking") {
    // return an empty React component
    return <></>;
  } else {
    return (
      // <header className="sticky top-0">
      <>
        <nav className="w-10/12 flex justify-between mx-auto sticky lg:top-20 top-10 items-center z-10">
          <LinkTo to="/" className="text-4xl font-boska font-bold">
            至福
          </LinkTo>
          <Button
            handleClick={handleMenuVisibility}
            className=" xl:hidden flex"
          >
            <img src="/images/menu.svg" alt="Menu" width="30px" />
          </Button>
          <div className="hidden xl:flex  font font-general_sans items-center text-xl ">
            {!user ? (
              <>
                <LinkTo to="/auth/login" className="ml-8 ">
                  Log In
                </LinkTo>
                <LinkTo to="/auth/signup" className="ml-8 ">
                  Sign Up
                </LinkTo>
              </>
            ) : (
              <>
                <LinkTo to="/dashboard" className="ml-8  underline">
                  {user.firstName}
                </LinkTo>
              </>
            )}
            <LinkTo
              to="/booking"
              className="ml-8  border-4 rounded-full
             border-secondary p-10 duration-300 transition-colors
             hover:bg-secondary hover:text-white"
            >
              Book
            </LinkTo>
          </div>
        </nav>
        <div
          className="inset-0 fixed z-20 bg-secondary hidden  text-4xl  font-general_sans"
          ref={menu}
        >
          <div className="flex flex-col mt-10">
            <Button handleClick={handleMenuVisibility} className="m-4">
              <img src="/images/close.svg" alt="" width="60px" />
            </Button>
            {!user ? (
              <>
                <LinkTo to="/auth/login" className="m-8 ">
                  Log In
                </LinkTo>
                <LinkTo to="/auth/signup" className="m-8 ">
                  Sign Up
                </LinkTo>
                <LinkTo to="/booking" className="m-8 ">
                  Book
                </LinkTo>
              </>
            ) : (
              <>
                <LinkTo to="/dashboard" className="ml-8  underline">
                  {user.firstName}
                </LinkTo>
                <LinkTo to="/booking" className="m-8 ">
                  Book
                </LinkTo>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
};
