import PropTypes from "prop-types";
import React from "react";

import "./index.css";

const SinglelineTextControl = ({
  invalid,
  handleChange,
  hint,
  id,
  label,
  optional = false,
  size,
  validation,
  value
}) => {
  const className = `SinglelineTextControl ${
    invalid && !optional ? "SinglelineTextControl--invalid" : ""
  }`;
  return (
    <div className={className}>
      <label className="SinglelineTextControl-label" htmlFor={id}>
        {label}
      </label>
      {hint && <p className="SinglelineTextControl-hint">{hint}</p>}
      {validation &&
        !optional && (
          <p className="SinglelineTextControl-validation">
            <strong className="SinglelineTextControl-validationInner">
              {validation}
            </strong>
          </p>
        )}
      <input
        className="SinglelineTextControl-element"
        id={id}
        name={id}
        size={size}
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

SinglelineTextControl.propTypes = {
  invalid: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  hint: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  optional: PropTypes.bool,
  size: PropTypes.oneOf([1, 2, 4, 8, 16, 32, 48, 64]).isRequired,
  validation: PropTypes.string,
  value: PropTypes.string
};

export default SinglelineTextControl;
