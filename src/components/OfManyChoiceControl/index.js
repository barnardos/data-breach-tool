import React from "react";
import PropTypes from "prop-types";

import ChoiceControl from "../ChoiceControl";

import "./index.css";

const OfManyChoiceControl = ({
  checkedValue,
  choices,
  handleChange,
  hint,
  id,
  invalid,
  legend,
  name,
  type,
  validation
}) => {
  const className = `OfManyChoiceControl ${
    invalid ? "OfManyChoiceControl--invalid" : ""
  }`;
  return (
    <div className={className}>
      <fieldset className="OfManyChoiceControl-fieldset" id={id}>
        <legend className="OfManyChoiceControl-legend">{legend}</legend>
        {hint && <p className="OfManyChoiceControl-hint">{hint}</p>}
        {invalid &&
          validation && (
            <p className="OfManyChoiceControl-validation">
              <strong className="OfManyChoiceControl-validationInner">
                {validation}
              </strong>
            </p>
          )}
        <div className="OfManyChoiceControl-choiceControls">
          {choices.map((option, index) => (
            <div className="OfManyChoiceControl-choiceControl" key={index}>
              <ChoiceControl
                checked={checkedValue === option.value}
                name={name}
                type={type}
                handleChange={handleChange}
                {...option}
              />
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

OfManyChoiceControl.propTypes = {
  checkedValue: PropTypes.string,
  choices: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  hint: PropTypes.string,
  invalid: PropTypes.bool,
  id: PropTypes.string.isRequired,
  legend: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["any", "one"]).isRequired,
  validation: PropTypes.string
};

export default OfManyChoiceControl;
