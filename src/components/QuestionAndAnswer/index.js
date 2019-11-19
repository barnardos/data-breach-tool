import PropTypes from "prop-types";
import React, { Component } from "react";

import QuestionAndAnswerOutput from "../QuestionAndAnswerOutput";
import HeadingTwo from "../HeadingTwo";
import HeadingOne from "../HeadingOne";
import Paragraph from "../Paragraph";

class QuestionAndAnswer extends Component {
  renderFormField = field => {
    const { answers } = this.props;

    switch (field.type) {
      case "HeadingTwo":
        return (
          <HeadingTwo {...field} key={field.id}>
            {field.heading}
          </HeadingTwo>
        );
      case "HeadingOne":
        return (
          <HeadingOne {...field} key={field.id}>
            {field.heading}
          </HeadingOne>
        );
      default:
        return (
          <QuestionAndAnswerOutput
            {...field}
            key={field.id}
            answer={answers[field.id]}
          />
        );
    }
  };

  render() {
    const { id, title, formFields } = this.props;
    return (
      <React.Fragment>
        <HeadingOne id={id}>{title}</HeadingOne>
        {formFields.length === 0 && (
          <Paragraph>No answers meeting selected criteria</Paragraph>
        )}
        {formFields.length > 0 && formFields.map(this.renderFormField)}
      </React.Fragment>
    );
  }
}

QuestionAndAnswer.propTypes = {
  paragraph: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  answers: PropTypes.shape(),
  formFields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string
    })
  )
};

export default QuestionAndAnswer;
