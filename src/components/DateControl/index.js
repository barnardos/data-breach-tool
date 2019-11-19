import PropTypes from "prop-types";
import React from "react";

import "./index.css";

const DateControl = ({
  dayValue,
  handleChange,
  hint,
  id,
  invalid,
  label,
  monthValue,
  validation,
  yearValue
}) => {
  const className = `DateControl ${invalid ? "DateControl--invalid" : ""}`;
  return (
    <fieldset className={className}>
      <legend className="DateControl-legend">{label}</legend>
      {hint && <p className="DateControl-hint">{hint}</p>}
      {validation && (
        <p className="DateControl-validation">
          <strong className="DateControl-validationInner">{validation}</strong>
        </p>
      )}
      <div className="DateControl-labelsAndElements">
        <label className="DateControl-label" htmlFor={`${id}-day`}>
          Day
        </label>
        <input
          className="DateControl-element"
          id={`${id}-day`}
          name={`${id}-day`}
          onChange={handleChange}
          type="number"
          value={dayValue}
        />
        <label className="DateControl-label" htmlFor={`${id}-month`}>
          Month
        </label>
        <input
          className="DateControl-element"
          id={`${id}-month`}
          name={`${id}-month`}
          onChange={handleChange}
          type="number"
          value={monthValue}
        />
        <label className="DateControl-label" htmlFor={`${id}-year`}>
          Year
        </label>
        <input
          className="DateControl-element"
          id={`${id}-year`}
          name={`${id}-year`}
          onChange={handleChange}
          type="number"
          value={yearValue}
        />
      </div>
    </fieldset>
  );
};

DateControl.propTypes = {
  dayValue: PropTypes.string,
  invalid: PropTypes.bool,
  handleChange: PropTypes.func,
  hint: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  monthValue: PropTypes.string,
  validation: PropTypes.string,
  yearValue: PropTypes.string
};

export default DateControl;
