import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = (props: { children: React.ReactNode }) => (
  <>
    <div className="bg-dark">
      <Header />
      <div className="container min-h-screen my-4">{props.children}</div>
      <Footer />
    </div>
  </>
);

export default Layout;
