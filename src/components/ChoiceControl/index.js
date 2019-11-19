import PropTypes from "prop-types";
import React from "react";

import "./index.css";

const ChoiceControl = ({
  checked,
  handleChange,
  id,
  label,
  name,
  required,
  type = "any",
  value
}) => (
  <div className="ChoiceControl">
    <input
      checked={checked}
      className="ChoiceControl-element"
      onChange={handleChange}
      id={id}
      name={name}
      required={required}
      type={type === "any" ? "checkbox" : "radio"}
      value={value}
    />
    <label className="ChoiceControl-label" htmlFor={id}>
      {label}
    </label>
  </div>
);

ChoiceControl.propTypes = {
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  handleChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.oneOf(["any", "one"]),
  value: PropTypes.string.isRequired
};

export default ChoiceControl;
