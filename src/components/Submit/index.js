import PropTypes from "prop-types";
import React from "react";

import "./index.css";

const Submit = ({ handleClick, text }) => {
  return (
    <div>
      <input
        className="Submit"
        type="submit"
        value={text}
        onClick={handleClick}
      />
    </div>
  );
};

Submit.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default Submit;
