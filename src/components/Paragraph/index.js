import PropTypes from "prop-types";
import React from "react";
import Markdown from "markdown-to-jsx";

import "./index.css";

const Paragraph = ({ children }) => (
  <Markdown className="Paragraph" options={{ forceBlock: true }}>
    {children}
  </Markdown>
);

Paragraph.propTypes = {
  children: PropTypes.node.isRequired
};

Paragraph.defaultProps = {
  children: ""
};

export default Paragraph;
