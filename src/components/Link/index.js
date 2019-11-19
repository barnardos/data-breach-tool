import PropTypes from "prop-types";
import React from "react";

const Link = ({ href, target, children }) => (
  <a href={href} target={target}>
    {children}
  </a>
);

Link.propTypes = {
  href: PropTypes.string.isRequired,
  target: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Link;
