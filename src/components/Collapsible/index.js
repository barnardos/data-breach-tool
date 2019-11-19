import PropTypes from "prop-types";
import React from "react";

import Paragraph from "../Paragraph";

import "./index.css";

const Collapsible = ({ label, children }) => {
  return (
    <React.Fragment>
      <label className="Collapsible Collapsible--orange" htmlFor="_1">
        <Paragraph>{label}</Paragraph>
      </label>
      <input id="_1" type="checkbox" />
      <div className="Collapsible-content">{children}</div>
    </React.Fragment>
  );
};

Collapsible.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired
};

export default Collapsible;
