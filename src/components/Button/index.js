import PropTypes from "prop-types";
import React from "react";

import "./index.css";

const Button = ({ handleClick, text, color }) => {
  return (
    <button className={`Button Button--${color}`} onClick={handleClick}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: "red"
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string
};

export default Button;
