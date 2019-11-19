import PropTypes from "prop-types";
import React from "react";

import "./index.css";

const Form = ({ children }) => (
  <form className="Form" action="#">
    {children}
  </form>
);

Form.propTypes = {
  children: PropTypes.node.isRequired
};

export default Form;
