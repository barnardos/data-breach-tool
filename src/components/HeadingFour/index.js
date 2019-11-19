import PropTypes from "prop-types";
import React from "react";

import "./index.css";

const HeadingFour = ({ children }) => (
  <h4 className="HeadingFour">{children}</h4>
);

HeadingFour.propTypes = {
  children: PropTypes.node.isRequired
};

export default HeadingFour;
