import React from "react";

import { Navbar } from "../navbar";

interface LayoutProps {
  children: React.ReactNode;
  token: string;
}

const Layout: React.FC<LayoutProps> = ({ children, token }) => {
  return (
    <>
      <main className="container mx-auto">
        <Navbar token={token} />
        {children}
      </main>
    </>
  );
};

export default React.memo(Layout);
