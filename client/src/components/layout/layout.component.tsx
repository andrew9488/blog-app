import React from "react";

import { Navbar } from "../navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <main className="container mx-auto">
        <Navbar />
        {children}
      </main>
    </>
  );
};

export default Layout;
