import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = (props: { children: React.ReactNode }) => (
  <>
    <div className="bg-gray-100">
      <Header />
      <div className="container min-h-screen my-4">{props.children}</div>
      <Footer />
    </div>
  </>
);

export default Layout;
