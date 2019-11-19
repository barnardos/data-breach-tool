import PropTypes from "prop-types";
import React from "react";

import "./index.css";

const Steps = ({ currentSection, totalNumberOfSections }) => {
  return (
    <div className="Steps">
      Step {currentSection} of {totalNumberOfSections}
    </div>
  );
};

Steps.propTypes = {
  currentSection: PropTypes.number.isRequired,
  totalNumberOfSections: PropTypes.number.isRequired
};

export default Steps;
