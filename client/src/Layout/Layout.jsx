import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="min-h-[75vh] my">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
