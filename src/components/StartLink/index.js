import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

import "./index.css";

const StartLink = props => (
  <div>
    <Link className="StartLink" {...props}>
      {`Start now`}
    </Link>
  </div>
);

StartLink.propTypes = {
  to: PropTypes.string.isRequired
};

export default StartLink;
