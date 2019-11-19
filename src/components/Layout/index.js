import PropTypes from "prop-types";
import React from "react";

import Footer from "../Footer";
import Header from "../Header";

import "./index.css";

const Layout = ({ children }) => (
  <div className="Layout">
    <Header />
    <div className="Layout-main">{children}</div>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
