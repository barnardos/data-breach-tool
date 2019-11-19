import PropTypes from "prop-types";
import React from "react";

import "./index.css";

const HeadingTwo = ({ children, id }) => (
  <h3 className="HeadingTwo" id={id}>
    {children}
  </h3>
);

HeadingTwo.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string
};

export default HeadingTwo;
