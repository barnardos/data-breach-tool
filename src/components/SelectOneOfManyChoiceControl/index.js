import React from "react";
import PropTypes from "prop-types";

import "./index.css";

const SelectOneOfManyChoiceControl = ({
  choices,
  displayOption,
  handleChange,
  hint,
  id,
  invalid,
  label,
  name,
  required,
  selectedChoice,
  validation
}) => {
  const className = `SelectOneOfManyChoiceControl ${
    invalid ? "SelectOneOfManyChoiceControl--invalid" : ""
  }`;
  return (
    <div className={className}>
      <label className="SelectOneOfManyChoiceControl-label" htmlFor={id}>
        {label}
      </label>
      {hint && <p className="SelectOneOfManyChoiceControl-hint">{hint}</p>}
      {invalid &&
        validation && (
          <p className="SelectOneOfManyChoiceControl-validation">
            <strong className="SelectOneOfManyChoiceControl-validationInner">
              {validation}
            </strong>
          </p>
        )}
      <select
        className="SelectOneOfManyChoiceControl-element"
        name={name}
        id={id}
        onChange={handleChange}
        value={selectedChoice}
        required={required}
      >
        {displayOption && (
          <option value="" disabled>
            {displayOption}
          </option>
        )}
        {choices.map((choice, index) => (
          <option
            className="SelectOneOfManyChoiceControl-option"
            value={choice.value}
            key={index}
          >
            {choice.label}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectOneOfManyChoiceControl.propTypes = {
  choices: PropTypes.array.isRequired,
  displayOption: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  hint: PropTypes.string,
  invalid: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  selectedChoice: PropTypes.string,
  validation: PropTypes.string
};

export default SelectOneOfManyChoiceControl;
