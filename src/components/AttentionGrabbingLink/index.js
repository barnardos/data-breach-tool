import PropTypes from "prop-types";
import React from "react";

import "./index.css";

const AttentionGrabbingLink = ({ color, href, target, text }) => {
  const className = `AttentionGrabbingLink AttentionGrabbingLink--${color}`;
  return (
    <a className={className} href={href} target={target}>
      {text}
    </a>
  );
};

AttentionGrabbingLink.propTypes = {
  color: PropTypes.oneOf(["black"]),
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  target: PropTypes.string
};

export default AttentionGrabbingLink;
