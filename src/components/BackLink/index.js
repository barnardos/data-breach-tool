import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

import { labels } from "../../data/app.json";

import "./index.css";

const BackLink = props => (
  <Link className="BackLink" {...props}>
    {labels.back}
  </Link>
);

BackLink.propTypes = {
  to: PropTypes.string.isRequired
};

export default BackLink;
