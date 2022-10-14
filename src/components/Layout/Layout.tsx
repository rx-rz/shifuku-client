import React from "react";
import { Dashboard } from "../Elements/Dashboard";
import { Footer } from "../Elements/Footer";
import { Navbar } from "../Elements/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};
export const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export function AuthLayout({ children }: LayoutProps) {
  return (
    <div className=" h-full flex items-center justify-center font-general_sans">
      <div className="lg:w-4/12 xl:w-3/12 w-11/12 my-20 md:w-8/12 ">
        {children}
      </div>
    </div>
  );
}

export const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Dashboard />
      <>{children}</>
    </div>
  );
};
